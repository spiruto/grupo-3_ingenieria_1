const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();

const port = 3000;

//const User = require('./models/user'); // Assuming your user model file is named userModel.js

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

mongoose.connect('mongodb://localhost:27017/Proyecto1', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


    // configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Define routes
app.use('/api/login', require('./routes/login'));
app.use('/api/user', require('./routes/user'));

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = router;