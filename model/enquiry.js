const { Schema, model } = require("mongoose");

const enquirySchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    address: String,
    subject: String,
    message: String,
  },
  { timestamps: true }
);

module.exports = model("Enquiry", enquirySchema);
