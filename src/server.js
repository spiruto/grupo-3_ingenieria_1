const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

const app = express();

app.use(express.static("src/public"));
app.use("/", express.static("src/public/views"));
const privateKey = fs.readFileSync(path.join(__dirname, '../certificates/tienda.com+4-key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, '../certificates/tienda.com+4.pem'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);
const HTTPS_PORT = 443;
httpsServer.listen(HTTPS_PORT, () => {
  console.log(`Servidor corriendo en el puerto ${HTTPS_PORT}`);
});
const httpApp = express();
httpApp.get('*', (req, res) => {
  res.redirect(`https://${req.headers.host}${req.url}`);
});
const httpServer = http.createServer(httpApp);
const HTTP_PORT = 80;
httpServer.listen(HTTP_PORT);