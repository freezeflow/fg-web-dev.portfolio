import mongoose from "mongoose";

const clientFileSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  filePath: {
    type: String,
    required: true,
    trim: true,
  },
  fileName: {
    type: String,
    required: true,
    trim: true,
  },
  fileType: {
    type: String,
    required: true,
    trim: true,
  },
  note: {
    type: String,
    default: "",
    trim: true,
  }
}, {
  timestamps: true,
});

export default mongoose.model("ClientFile", clientFileSchema);
