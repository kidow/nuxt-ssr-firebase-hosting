const functions = require("firebase-functions");
const { Nuxt } = require("nuxt");
const express = require("express");

const app = express();

const nuxtConfig = require("./nuxt.config.js");

const config = {
  ...nuxtConfig,
  dev: false,
  debug: false
};
const nuxt = new Nuxt(config);

function handleRequest(req, res) {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  return new Promise((resolve, reject) => {
    nuxt.ready().then(() => {
      nuxt.render(req, res, promise => {
        promise.then(resolve).catch(reject);
      });
    });
  });
}

app.use(handleRequest);
exports.ssrapp = functions.https.onRequest(app);
