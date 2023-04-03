const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");
const authMiddleware = require('../middlewares/authMiddleware')
const Appointment = require('../models/appointmentModel')
const User = require('../models/userModel')

router.get("/get-doctor-info-by-user-id", async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.query.userId });
    res.status(200).send({
      success: true,
      message: "Doctor info fetched successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
});

router.get("/get-doctor-info-by-id", async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.query.doctorId });
    res.status(200).send({
      success: true,
      message: "Doctor info fetched successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor info", success: false, error });
  }
});

router.post("/update-doctor-profile", async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      {userId: req.body.userId}, req.body
    )
    res.status(200).send({
      success: true,
      message: "Doctor profile updated successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating doctor profile", success: false, error });
  }
});

router.post("/update-doctor-profile", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      {userId: req.body.userId},
      req.body
    )
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Doctor info updated successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating doctor info", success: false, error });
  }
});
//641d9b374be77e38fd03aa44
//641d9b5b4be77e38fd03aa4b

router.get("/get-appointments-by-doctor-id", authMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({userId: req.body.userId})
    console.log(doctor,"doctros -=-=-=-=-")
    const appointments = await Appointment.find({doctorId:doctor._id});
    console.log(appointments,"appointments")
    res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);

    res.status(500)
      .send({ message: "Error fetching appointments", success: false, error });
  }
});

router.post("/change-appointment-status", authMiddleware, async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    });
    const user = await User.findOne({ _id: appointment.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "appointment-status-changed",
      message: `Your appointment status has been ${status}`,
      onclickPath: "/appointments",
    });
    user.isDoctor = status === 'approved' ? true : false
    await user.save()
    console.log(user,"saved")

    res.status(200).send({
      message: "Appointment status updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .send({ message: "Error changing appointment status", success: false });
  }
});
module.exports = router;
