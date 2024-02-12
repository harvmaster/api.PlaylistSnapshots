import { Request } from 'express'

export interface AuthenticatedUser {
  _id: string;
  spotify_id: string;
}

export interface AuthenticatedUserRequest extends Request {
  user: AuthenticatedUser
}