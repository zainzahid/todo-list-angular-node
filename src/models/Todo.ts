import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description: string;
  priority: string;
  dueDate: Date;
  status: string;
  user: mongoose.Types.ObjectId;
}

const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<ITodo>("Todo", TodoSchema);