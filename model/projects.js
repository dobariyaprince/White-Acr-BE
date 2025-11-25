const { Schema, model } = require("mongoose");

const projectsSchema = new Schema(
  {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    completionDate: {
      type: Number,
      default: null,
    },
    images: [{
      type: String,
    }],
  },
  { timestamps: true }
);

module.exports = model("Projects", projectsSchema);
