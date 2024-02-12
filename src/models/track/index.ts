import mongoose, { Document, Model, Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '../../../config'

export interface ITrack {
  spotify_id: string;
  name: string;
  artist: string;
  album: string;
  duration: number;
  album_cover: string;

  create_date: Date;
}

export interface ITrackDocument extends ITrack, Document {
  toRes(): Track;
}

interface ITrackModel extends Model<ITrackDocument> {}

const TrackSchema: Schema<ITrackDocument> = new Schema({
  spotify_id: {
    type: String,
  },
  name: {
    type: String,
  },
  artist: {
    type: String,
  },
  album: {
    type: String,
  },
  duration: {
    type: Number,
  },
  album_cover: {
    type: String,
  },
  create_date: {
    type: Date,
    default: Date.now,
  }
})

TrackSchema.methods.toRes = function (): Track {
  return {
    id: this._id,
    spotify_id: this.spotify_id,
    name: this.name,
    artist: this.artist,
    album: this.album,
    duration: this.duration,
    album_cover: this.album_cover
  }
}

const Track = mongoose.model<ITrackDocument, ITrackModel>('Track', TrackSchema)

export default Track;
