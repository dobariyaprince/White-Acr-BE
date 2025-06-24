const whiteArcSchema = new Schema(
  {
    banner: String,
    sections: [
      {
        type: String,
        title: String,
        description: String,
        image: String,
        link: String,
      },
    ],
    projects: [
      {
        title: String,
        img: String,
        link: String,
      },
    ],
    socialSection: [
      {
        heading: String,
        post: String,
        link: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("WhiteArc", whiteArcSchema);
