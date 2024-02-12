interface PlaylistI {
  id: string;
  spotify_id: string;
  name: string;
  description: string;
  image: string;

  added_by: string; // Spotify user id
  tracked: Date | undefined | null;
  createdAt: Date;

  events: {
    total: number;
    items?: PlaylistEvent[];
  }

  tracks: {
    total: number;
    items?: string[];
  };
}

interface Track {
  id: string;
  spotify_id: string;
  name: string;
  artist: string;
  album: string;
  album_cover: string;
  duration: number;
}

interface PlaylistEvent {
  id: string;
  track_id: string;
  event_type: string;
  createdAt: Date;
}

// /playlists response
interface UsersPlaylistsResponse {
  playlists: PlaylistI[];
}


// /playlists/:id response
interface PlaylistResponse {
  playlist: PlaylistI;
  tracks: {
    [id: string]: Track;
  }
}

// /playlists/:id/status response
interface PlaylistStatusResponse {
  playlist: {
    tracked: Date | undefined | null;
  };
}

