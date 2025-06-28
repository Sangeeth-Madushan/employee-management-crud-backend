import mongoose from "mongoose";

// Employee Schema
const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },

  firstName: {
    type: String,
    required: true,
    trim: true,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  phone: {
    type: String,
    required: true,
    trim: true,
  },

  address: {
    type: String,
    required: false,
  },

  position: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    required: false,
  },

  joinDate: {
    type: Date,
    default: Date.now,
  },

  img: {
    type: String,
    default: "https://avatar.iran.liara.run/public/boy?username=Ash",
  },
});

const Employee = mongoose.model("employees", employeeSchema);

export default Employee;
