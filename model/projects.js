const projectsSchema = new Schema(
  {
    banner: String,
    intro: String,
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
  },
  { timestamps: true }
);

module.exports = model("Projects", projectsSchema);
