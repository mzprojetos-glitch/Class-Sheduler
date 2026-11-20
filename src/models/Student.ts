import { Schema, model, models, type Model, type Types } from 'mongoose';

interface IStudent { userId: Types.ObjectId; name: string; plan: 2 | 4; schedule: { weekday: number; start: string; end: string }[]; active: boolean }
const schema = new Schema<IStudent>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, trim: true },
  plan: { type: Number, enum: [2, 4], default: 2 },
  schedule: [{ _id: false, weekday: { type: Number, min: 1, max: 6 }, start: String, end: String }],
  active: { type: Boolean, default: true },
}, { timestamps: true });

export const Student: Model<IStudent> = models.Student || model<IStudent>('Student', schema);
