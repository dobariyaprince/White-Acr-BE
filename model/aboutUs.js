const { Schema, model, Types } = require("mongoose");

const collectionSchema = new Schema(
    {
        slider: {
            type: Array,
            default: [],
        },
        sections: [
            {
                img: {
                    type: String,
                    default: null,
                },
                mainTitle: {
                    type: String,
                    default: null,
                },
                title: {
                    type: String,
                    default: null,
                },
                discription: {
                    type: String,
                    default: null,
                },
                link: {
                    type: String,
                    default: null,
                },
            }
        ],
        followOn: [
            {
                img: {
                    type: String,
                    default: null,
                },
                link: {
                    type: String,
                    default: null,
                },
            }
        ]
    },
    {
        timestamps: true,
    }
);

module.exports = model("aboutUs", collectionSchema);
