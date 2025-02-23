const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    owner:{
      type: Schema.Types.ObjectId,
      ref:"User"
    },
  },
);


const Notelisting = mongoose.model("Notelisting", listingSchema);
module.exports = Notelisting;
