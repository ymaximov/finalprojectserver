const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  website: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  specialization: {
    type: String,
    require: true,
  },
  experience: {
    type: String,
    require: true,
  },
  feePerConsultation: {
    type: Number,
    required: true,
  },
  timings: {
    type: Array,
    required: false,
  },
  status: {
    type: String,
    default: 'pending'
  },
  // timestamps: true,
});

const doctorModel = mongoose.model("doctors", doctorSchema);
module.exports = doctorModel;
