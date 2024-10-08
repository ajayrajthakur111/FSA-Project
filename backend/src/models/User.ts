import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
declare global {
    namespace Express {
      interface Request {
        user?: IUser;
      }
    }
  }
  interface IUser extends Document {
      email: string;
      password: string;
      comparePassword: (password: string) => Promise<boolean>;
    }
    

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema);
