import mongoose from 'mongoose'

const uptimeSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['up', 'down'],
    },

    responseTime: {
        type: Number
    }
}, {
    timestamps: true
})

const UptimeLog = mongoose.model('UptimeLog', uptimeSchema)
export default UptimeLog