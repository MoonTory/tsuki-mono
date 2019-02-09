import { Schema, Document, Model, model } from 'mongoose';
import bcrypt from 'bcryptjs';

import { IUser } from '../../../../domain/user';

export interface IUserModel extends IUser, Document {
  password?: string;
  hashPassword(passowrd: string): string;
  isValidPassword(): boolean;
}

export const UserSchema = new Schema(
  {
    method: {
      type: String,
      enum: ['local', 'google', 'facebook'],
      required: true
    },
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String
    },
    googleId: {
      type: String
    },
    confirmed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre('save', async function(this: any, next) {
  try {
    if (this.method !== 'local') {
      next();
    }

    this.password = await this.hashPassword(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.hashPassword = async function(password: string) {
  try {
    // Generate Salt
    const salt = await bcrypt.genSalt(12);

    // Generate a password hash (Salt + Hash)
    const passwordHash = await bcrypt.hash(password, salt);

    // Save hashed password to the model to be stored in DB
    return passwordHash;
  } catch (error) {
    throw new Error(error);
  }
};

UserSchema.methods.isValidPassword = async function(newPassword: string) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

export const UserModel: Model<IUserModel> = model<IUserModel>('User', UserSchema);
