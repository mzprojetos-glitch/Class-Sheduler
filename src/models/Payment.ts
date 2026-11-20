import { Schema, model, models, type Model, type Types } from 'mongoose';

interface IPayment { userId: Types.ObjectId; studentId: Types.ObjectId; month: string; amount: number; paid: boolean; paidAt?: Date }
const schema = new Schema<IPayment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  month: { type: String, required: true }, // YYYY-MM
  amount: { type: Number, required: true },
  paid: { type: Boolean, default: false },
  paidAt: Date,
}, { timestamps: true });
schema.index({ studentId: 1, month: 1 }, { unique: true });

export const Payment: Model<IPayment> = models.Payment || model<IPayment>('Payment', schema);
