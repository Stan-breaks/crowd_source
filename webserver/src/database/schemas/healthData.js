const mongoose = require("mongoose");
const healthDataSchema = new mongoose.Schema({
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
  disease: {
    type: String,
    required: true,
  },
  trend: {
    type: String,
    required: true,
  },
  trendColor: {
    type: String,
    required: true,
  },
  prevalence: {
    type: String,
    required: true,
  },
  mortalityRate: {
    type: String,
    required: true,
  },
  recommendedTreatments: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("HealthData", healthDataSchema);

