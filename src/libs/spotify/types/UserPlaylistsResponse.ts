import { SpotifyPlaylist } from './Playlist'

export type UsersPlaylistsResponse = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;

  items: SpotifyPlaylist[];
}