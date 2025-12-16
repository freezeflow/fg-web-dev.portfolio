import mongoose from "mongoose";
const { Schema } = mongoose;

const featuredSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    company: { type: String },

    scope: { 
        type: [String], 
        default: [] 
    },

    link: {
        type: String,
        trim: true,
        validate: {
            validator: v => !v || /^https?:\/\/[^\s]+$/.test(v),
            message: props => `${props.value} is not a valid URL!`
        }
    },

    challenges: { type: String },
    solution: { type: String },

    deliveredFeats: {
        type: [String],
        default: []
    },

    tags: {
        type: [String],
        default: []
    },

    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },

    testimonial: {
        feedback: { type: String },
        pictureUrl: { type: String }
    },

    file: {
        filePath: { type: String },
        fileName: { type: String }
    }

}, { timestamps: true });

const Featured = mongoose.model("Featured", featuredSchema);
export default Featured;