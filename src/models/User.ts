import { Schema, model, models, type Model } from 'mongoose';

interface IUser { name: string; email: string; password?: string; provider: string; accountType: string; acceptedTermsAt?: Date }
const schema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, select: false },
  provider: { type: String, default: 'credentials' },
  accountType: { type: String, default: 'Instrutor' },
  acceptedTermsAt: Date,
}, { timestamps: true });

export const User: Model<IUser> = models.User || model<IUser>('User', schema);
