const { Schema, model } = require("mongoose");

const enquirySchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    siteLocation: {
      type: String,
      default: null,
    },
    projectType: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = model("Enquiry", enquirySchema);
