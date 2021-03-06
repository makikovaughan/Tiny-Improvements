//For environment file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

var env = process.env.NODE_ENV || "development";
var config = require("./config/config.json")[env];

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//For Heroku
if (config.use_env_variable) {
  mongoose.connect(process.env[config.use_env_variable], { useNewUrlParser: true });
}
else {
  //Local URL
  mongoose.connect('mongodb://localhost/kudo_db', { useNewUrlParser: true });
}

require('./routes/apiRoutes')(app);
require('./routes/html-route')(app);


app.listen(PORT, function () {
  console.log(`App running on port ${PORT}`);
});