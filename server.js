const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


mongoose.connect('mongodb://localhost/kudo_db', { useNewUrlParser: true });


require('./routes/apiRoutes')(app);


app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});