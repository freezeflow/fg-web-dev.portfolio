import mongoose from "mongoose";
const { Schema } = mongoose;

const projectsSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  summary: {
    type: String,
    required: true,
    trim: true
  },

  link: {
    type: String,
    trim: true,
    validate: {
      validator: v => !v || /^https?:\/\/.+\..+/.test(v),
      message: props => `${props.value} is not a valid URL!`
    },
    default: null
  },

  tech: {
    type: [String],
    required: true,
    validate: [arr => arr.length > 0, 'At least one tech is required']
  },

  type: {
    type: String,
    required: true,
    trim: true
  },

  featured: {
    type: Boolean,
    default: false
  },

  isCompleted: {
    type: Boolean,
    default: false
  },

  dateCompleted: {
    type: Date,
    default: null
  }

}, {
  timestamps: true
});

const Project = mongoose.model("Project", projectsSchema);
export default Project;
