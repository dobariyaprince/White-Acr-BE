const contactUsSchema = new Schema(
  {
    banner: String,
    description: String,
    contactDetails: {
      address: String,
      phone: String,
      email: String,
      mapEmbedUrl: String,
    },
    formFields: [
      {
        label: String,
        name: String,
        placeholder: String,
        type: { type: String, default: "text" },
        required: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("ContactUs", contactUsSchema);
