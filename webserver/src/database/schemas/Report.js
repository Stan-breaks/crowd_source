const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
  disease: {
    type: String,
    required: true,
  },
  numberOfCases: {
    type: Number,
    required: true,
  },
  numberOfDeaths: {
    type: Number,
    required: true,
  },
  approximatedPopulationCloseBy: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", reportSchema);
