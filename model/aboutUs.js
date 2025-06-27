const { Schema, model } = require("mongoose");

const aboutUsSchema = new Schema(
  {
    banner: { type: String, default: null },
    intro: { type: String, default: null },
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
        subItems: [
          {
            title: {
              type: String,
              default: null,
            },
            description: {
              type: String,
              default: null,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("AboutUs", aboutUsSchema);
