import mongoose from "mongoose";
const {Schema} = mongoose;

const projectFilesSchema = Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        default: null
    },

    fileName: {
        type: String,
        required: true
    },

    filePath: {
        type: String,
        required: true
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt'}
});

// Create project model
const projectFile = mongoose.model('projectFile', projectFilesSchema)

export default projectFile