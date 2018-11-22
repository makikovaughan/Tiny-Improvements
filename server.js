const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

console.log(process.env.PORT);

//For Heroku
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
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