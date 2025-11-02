import mongoose from 'mongoose'
const { Schema } = mongoose;

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Invalid email format'],
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['active', 'pending'],
    default: 'pending',
    required: true,
  },
  pin: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    default: 'client',
    enum: ['client'],
    immutable: true
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
  passwordResetToken: String,
  passwordResetExpires: Date
}, {
  timestamps: true,
})

clientSchema.post("save", async function (doc) {
  await Featured.updateMany(
    { clientId: doc._id },
    {
      $set: {
        "clientInfo.name": doc.name,
        "clientInfo.company": doc.company,
      },
    }
  );
});

clientSchema.post("findOneAndUpdate", async function (doc) {
  if (!doc) return;
  await Featured.updateMany(
    { clientId: doc._id },
    {
      $set: {
        "clientInfo.name": doc.name,
        "clientInfo.company": doc.company,
      },
    }
  );
});

const Client = mongoose.model('Client', clientSchema)
export default Client
