const contactUsSchema = new Schema(
  {
    banner: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    contactDetails: {
      address: {
        type: String,
        default: null,
      },
      phone: {
        type: String,
        default: null,
      },
      email: {
        type: String,
        default: null,
      },
      mapEmbedUrl: {
        type: String,
        default: null,
      },
    },
    formFields: [
      {
        label: {
          type: String,
          default: null,
        },
        name: {
          type: String,
          default: null,
        },
        placeholder: {
          type: String,
          default: null,
        },
        type: {
          type: String,
          default: "text",
        },
        required: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("ContactUs", contactUsSchema);
