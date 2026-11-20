import { Schema, model, models, type Model, type Types } from 'mongoose';

interface ISession { userId: Types.ObjectId; studentId: Types.ObjectId; date: string; start: string; end: string; status: string; notes?: string }
const schema = new Schema<ISession>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  start: { type: String, required: true },
  end: { type: String, required: true },
  status: { type: String, enum: ['agendada', 'ministrada', 'falta', 'remarcada'], default: 'agendada' },
  notes: { type: String, maxlength: 500 },
}, { timestamps: true });
schema.index({ userId: 1, date: 1 });

export const ClassSession: Model<ISession> = models.ClassSession || model<ISession>('ClassSession', schema);
