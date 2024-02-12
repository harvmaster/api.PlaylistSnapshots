import { SpotifyPlaylist } from "./types/Playlist";

export interface FormattedPlaylist {
  id: string;
  name: string;
  description: string;
  image: string;
  tracks: {
    total: number;
  }
  
}

export const formatPlaylist = (playlist: SpotifyPlaylist): FormattedPlaylist => {
  return {
    id: playlist.id,
    name: playlist.name,
    description: playlist.description,
    image: playlist.images.sort((a, b) => b.height - a.height)[0]?.url || '',
    tracks: {
      total: playlist.tracks.total
    }
  }
}

export default formatPlaylist