const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


//For Heroku
if (process.env.MONGODB_URI) {
  mongoose.connect('mongodb://dbAdmin:wFCW5T4ww3th5sd@ds113134.mlab.com:13134/heroku_wwff38kr');
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