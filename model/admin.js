const { Schema, model, Types } = require("mongoose");

const collectionSchema = new Schema(
  {
    profile: {
      type: String,
      default: null,
    },
    contactName: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      lowercase: true,
      default: null,
      unique: true,
    },
    password: {
      type: String,
      default: null,
      unique: true,
    },
    token: {
      type: {
        type: String,
        enum: ["Access", "Denied"],
      },
      accessToken: {
        type: String,
      },
      refreshToken: {
        type: String,
      },
      createdAt: {
        type: Date,
      },
    },
    forgotPassword: {
      createdAt: {
        type: Date,
        default: null,
      },
    },
    deviceToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("admin", collectionSchema);
