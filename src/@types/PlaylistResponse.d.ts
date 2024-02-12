interface PlaylistResponse {
  playlist: Playlist;
  tracks: {
    [id: string]: Track;
  }
}