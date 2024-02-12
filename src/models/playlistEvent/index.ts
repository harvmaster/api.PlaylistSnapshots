import mongoose, { Document, Model, Schema } from 'mongoose'
import config from '../../../config'
import { ITrackDocument } from '../track';

export interface IEvent {
  track_id: Schema.Types.ObjectId;
  playlist_id: Schema.Types.ObjectId;

  event_type: string;

  create_date: Date;
}

interface IEventDocument extends IEvent, Document {
  toRes(): PlaylistEvent;
}

interface IEventModel extends Model<IEventDocument> {
  getCurrentState(playlistId: string): Promise<ITrackDocument[]>;
}

const EventSchema: Schema<IEventDocument> = new Schema({
  track_id: {
    type: Schema.Types.ObjectId,
    ref: 'Track',
  },
  playlist_id: {
    type: Schema.Types.ObjectId,
    ref: 'Playlist',
  },
  event_type: {
    type: String,
  },
  create_date: {
    type: Date,
    default: Date.now,
  }
});

EventSchema.statics.getCurrentState = async function (playlistId: string): Promise<ITrackDocument[]> {
  const events = await this.find({ playlist_id: playlistId }).sort({ create_date: 1 });
  // const events = await this.find({ playlist_id: playlistId }).sort({ create_date: 1 }).populate('track_id');
  console.log(events)

  return events.reduce((acc: ITrackDocument[], event) => {
    if (event.event_type === 'add') {
      return [...acc, event.track_id];
    } else {
      return acc.filter(track => track !== event.track_id);
    }
  }, []) as ITrackDocument[];
};

EventSchema.methods.toRes = function (): PlaylistEvent {
  return {
    id: this._id,
    track_id: this.track_id,
    event_type: this.event_type,
    createdAt: this.create_date,
  }
}

const Event = mongoose.model<IEventDocument, IEventModel>('Event', EventSchema);

export default Event;
