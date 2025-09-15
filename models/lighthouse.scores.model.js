import mongoose from "mongoose";

const lighthouseScores = new mongoose.Schema({
    scores: {
        performance: { type: Number },
        accessibility: { type: Number },
        seo: { type: Number },
        bestPractices: { type: Number }
    }
}, {
    timestamps: true
})

const LighthouseLog = mongoose.model('lighthouseLog', lighthouseScores)
export default LighthouseLog