import { Request } from "express";

interface AuthenticatedUserRequest extends Request{
  user: {
    _id: string;
    spotify_id: string;
  }
}