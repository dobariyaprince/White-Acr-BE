const { Schema, model } = require("mongoose");

const whiteArcSchema = new Schema(
  {
    banner: {
      type: String,
      default: null,
    },
    sections: [
      {
        type: {
          type: String,
          default: null,
        },
        title: {
          type: String,
          default: null,
        },
        description: {
          type: String,
          default: null,
        },
        image: {
          type: String,
          default: null,
        },
        link: {
          type: String,
          default: null,
        },
      },
    ],
    projects: [
      {
        title: {
          type: String,
          default: null,
        },
        img: {
          type: String,
          default: null,
        },
        link: {
          type: String,
          default: null,
        },
      },
    ],
    socialSection: [
      {
        heading: {
          type: String,
          default: null,
        },
        post: {
          type: String,
          default: null,
        },
        link: {
          type: String,
          default: null,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("WhiteArc", whiteArcSchema);
