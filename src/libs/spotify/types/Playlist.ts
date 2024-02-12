export type SpotifyImage = {
  url: string;
  height: number;
  width: number;
};

export type SpotifyExternalUrls = {
  spotify: string;
};

export type SpotifyFollowers = {
  href: string;
  total: number;
};

export type SpotifyOwner = {
  external_urls: SpotifyExternalUrls;
  followers: SpotifyFollowers;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
};

export type SpotifyTracks = {
  href: string;
  total: number;
};

export type SpotifyPlaylist = {
  collaborative: boolean;
  description: string;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: SpotifyOwner;
  public: boolean;
  snapshot_id: string;
  tracks: SpotifyTracks;
  type: string;
  uri: string;
};
