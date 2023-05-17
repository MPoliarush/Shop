const path = require('path')

const express = require('express');
const catalog = require('./routes/shop')
const cors = require("cors");
const db = require('./data');

const app = express();

app.use(cors())
app.options('*', cors())


// app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies
app.use(express.json())
app.use(express.static('public')); // Serve static files (e.g. CSS files)
// app.use('/uploadedIMG',express.static('uploadedIMG'));
app.use(express.static(__dirname))

app.use(catalog);


db.connectToDatabase().then(function () {
  app.listen(5000)
})