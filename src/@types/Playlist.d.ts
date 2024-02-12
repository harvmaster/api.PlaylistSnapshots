interface Playlist {
  id: string;
  spotify_id: string;
  name: string;
  description: string;
  image: string;

  added_by: {
    total: number;
    user: boolean;
  };
  
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