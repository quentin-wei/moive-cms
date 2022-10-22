import mongoose from 'mongoose';
import connection from '../db/connection.js';
import { MONGO_TABLE_NAME } from '../config/index.js';

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    sex: { type: Number },
    age: { type: Number },
    color: { type: String },
    title: { type: String },
    content: { type: String },
    show: { type: Boolean },
    province: { type: String },
    postCode: { type: String },
    email: { type: String },
    ip: { type: String },
  },
  { timestamps: true }
);

//table 名称 userlists 全小写带s, 不然默认会转成全小写,有s则不加 没s会默认加上s
const userModel = connection.model(MONGO_TABLE_NAME, userSchema);

export default userModel;
