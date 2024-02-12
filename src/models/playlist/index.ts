import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IPlaylist {
  spotify_id: string;
  added_by: string[];
  tracked: Date | null;
  last_snapshot: Date;
  create_date: Date;
}

type PlaylistResponse = {
  id: string;
  spotify_id: string;
  added_by: string[];
  tracked: Date | null;
  last_snapshot: Date;
  createdAt: Date;
}

interface IPlaylistDocument extends IPlaylist, Document {
  toRes(): PlaylistResponse;
}

interface IPlaylistModel extends Model<IPlaylistDocument> {}

const PlaylistSchema: Schema<IPlaylistDocument> = new Schema({
  spotify_id: {
    type: String,
  },
  added_by: {
    type: [String]
  },
  tracked: {
    type: Date
  },
  last_snapshot: {
    type: Date
  },
  create_date: {
    type: Date,
    default: Date.now,
  }
})

PlaylistSchema.methods.toRes = function (): PlaylistResponse {
  return {
    id: this._id,
    spotify_id: this.spotify_id,
    added_by: this.added_by,
    tracked: this.tracked,
    last_snapshot: this.last_snapshot,
    createdAt: this.create_date,
  }
}

const Playlist = mongoose.model<IPlaylistDocument, IPlaylistModel>('playlist', PlaylistSchema)

export default Playlist;
