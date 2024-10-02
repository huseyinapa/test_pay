require("express-async-errors");
const express = require("express");
const app = express();

require("dotenv").config();
require("./src/db/dbConnection");
const router = require("./src/routers");
const errorHandlerMiddleware = require("./src/middlewares/errorHandler");
const cors = require("cors");
const corsOptions = require("./src/helpers/corsOptions");
const path = require("path");
const moment = require("moment-timezone");
moment.tz.setDefault("Europe/Istanbul");
const apiLimiter = require("./src/middlewares/rateLimit");

// Cert
const fs = require('fs');
const http = require('http');
const https = require('https');

var privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

var credentials = { key: privateKey, cert: certificate };

// Middlewares
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(cors(corsOptions));

app.use("/api", router);

app.use("/api", apiLimiter)

app.get("/", (req, res) => {
  res.json({
    message: "Hoş Geldiniz",
  });

  // res.redirect("/farkli-sayfa");

});

// hata yakalama
app.use(errorHandlerMiddleware);

// var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// httpServer.listen(3000);
httpsServer.listen(6999, () => {
  console.log(`Server ${6999} portundan çalışıyor ...`);
});
