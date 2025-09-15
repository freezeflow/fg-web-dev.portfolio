import mongoose from "mongoose";

const weeklyAggregateSchema = new mongoose.Schema({
  weekStart: { type: Date, required: true },
  weekEnd: { type: Date, required: true },

  uptime: {
    monday: { type: Number, default: null },
    tuesday: { type: Number, default: null },
    wednesday: { type: Number, default: null },
    thursday: { type: Number, default: null },
    friday: { type: Number, default: null },
    saturday: { type: Number, default: null },
    sunday: { type: Number, default: null }
  },

  lighthouse: {
    monday: {
      performance: { type: Number, default: null },
      accessibility: { type: Number, default: null },
      seo: { type: Number, default: null },
      bestPractices: { type: Number, default: null }
    },
    tuesday: {
      performance: { type: Number, default: null },
      accessibility: { type: Number, default: null },
      seo: { type: Number, default: null },
      bestPractices: { type: Number, default: null }
    },
    wednesday: {
      performance: { type: Number, default: null },
      accessibility: { type: Number, default: null },
      seo: { type: Number, default: null },
      bestPractices: { type: Number, default: null }
    },
    thursday: {
      performance: { type: Number, default: null },
      accessibility: { type: Number, default: null },
      seo: { type: Number, default: null },
      bestPractices: { type: Number, default: null }
    },
    friday: {
      performance: { type: Number, default: null },
      accessibility: { type: Number, default: null },
      seo: { type: Number, default: null },
      bestPractices: { type: Number, default: null }
    },
    saturday: {
      performance: { type: Number, default: null },
      accessibility: { type: Number, default: null },
      seo: { type: Number, default: null },
      bestPractices: { type: Number, default: null }
    },
    sunday: {
      performance: { type: Number, default: null },
      accessibility: { type: Number, default: null },
      seo: { type: Number, default: null },
      bestPractices: { type: Number, default: null }
    },
  }
}, {
    timestamps: true
});

export default mongoose.model("WeeklyAggregate", weeklyAggregateSchema);