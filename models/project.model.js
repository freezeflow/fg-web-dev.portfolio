import mongoose from "mongoose";
import Featured from "./featured.model.js"
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

  tech: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) => arr.length > 0,
      message: "At least one tech is required"
    },
    enum: ['Vue.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Nuxt.js', 'MongoDB', 'PostgreSQL', 'Socket.io', 'Stripe API', 'Chart.js', 'JavaScript', 'CSS3', 'HTML5']
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

projectsSchema.pre("save", function (next) {
  if (this.isCompleted && !this.dateCompleted) {
    this.dateCompleted = new Date();
  }
  if (Array.isArray(this.tech)) {
    this.tech = this.tech.map((t) => t.trim());
  }
  next();
});

projectsSchema.post("save", async function (doc) {
  await Featured.updateMany(
    { projectId: doc._id },
    {
      $set: {
        "projectInfo.title": doc.title,
        "projectInfo.description": doc.description,
        "projectInfo.tech": doc.tech,
      },
    }
  );
});

projectsSchema.post("findOneAndUpdate", async function (doc) {
  if (!doc) return;
  await Featured.updateMany(
    { projectId: doc._id },
    {
      $set: {
        "projectInfo.title": doc.title,
        "projectInfo.description": doc.description,
        "projectInfo.tech": doc.tech,
      },
    }
  );
});

const Project = mongoose.model("Project", projectsSchema);
export default Project;
