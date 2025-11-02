import mongoose from "mongoose";
const { Schema } = mongoose;

const featuredSchema = new Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },

    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        default: null
    },

    projectInfo: {
        title: String,
        description: String,
        tech: [String],
    },

    clientInfo: {
        name: String,
        company: String,
        logo: String,
    },

    link: {
        type: String,
        trim: true,
        validate: {
            validator: v => !v || /^https?:\/\/.+\..+/.test(v),
            message: props => `${props.value} is not a valid URL!`
        },
    },

    role: {
        type: String,
        required: true,
        enum: ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'Software Engineer', 'Lead Developer', 'Web Designer']
    },

    testimonial: {
        type: String,
        required: true,
        trim: true
    },

}, {
  timestamps: true
});

const Featured = mongoose.model("Featured", featuredSchema);
export default Featured;