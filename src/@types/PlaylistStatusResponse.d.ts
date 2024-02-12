interface PlaylistStatusResponse {
  playlist: {
    tracked: Date | undefined | null;
    added_by: {
      total: number;
      user: boolean;
    }
  };
}