const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var KudoSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: "Please type title."
    },
    body: {
        type: String,
        trim: true,
        required: "Please type the kudos"
    },
    from_user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    to_user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
  });
  
  const Kudo = mongoose.model("Kudo", KudoSchema);
  
  module.exports = Kudo;