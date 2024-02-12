import mongoose, { Document, Model, Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '../../../config'

export interface IUser {
  spotify_id: string;
  refreshToken: string;
  create_date: Date;
}

interface IUserDocument extends IUser, Document {
  generateToken(): string;
}

interface IUserModel extends Model<IUserDocument> {}

const UserSchema: Schema<IUserDocument> = new Schema({
  spotify_id: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  create_date: {
    type: Date,
    default: Date.now,
  }
})

UserSchema.methods.generateToken = function (): string {
  return jwt.sign({
    _id: this._id,
    spotify_id: this.spotify_id,
  }, config.jwt_secret)
}

const User = mongoose.model<IUserDocument, IUserModel>('User', UserSchema)

export default User;
