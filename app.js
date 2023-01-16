/**
 * TODO 1: SETUP SERVER USING EXPRESS.JS.
 * UBAH SERVER DI BAWAH MENGGUNAKAN EXPRESS.JS.
 * SERVER INI DIBUAT MENGGUNAKAN NODE.JS NATIVE.
 */

// import express
const express = require("express");
// route definition
const router = require("./routes/api");
// object express
const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded());
// routing
app.use(router);
// port
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
