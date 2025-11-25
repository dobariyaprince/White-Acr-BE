const { Schema, model, Types } = require("mongoose");

const collectionSchema = new Schema(
  {
    uName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: {
        type: String,
        enum: ["Access", "Refresh", "Denied"],
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
    lastLogin: {
      type: Date,
      default: null,
    },
    forgotPassword: {
      createdAt: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("admin", collectionSchema);
