import mongoose from 'mongoose';
import connection from '../db/connection.js';

const uploadSchema = new mongoose.Schema(
  {
    originalFilename: { type: String, required: true },
    newFilename: { type: String, required: true },
    mimetype: { type: String },
    filepath: { type: String }
  },
  { timestamps: true }
);

const uploadModel = connection.model('uploads', uploadSchema);

export default uploadModel;
