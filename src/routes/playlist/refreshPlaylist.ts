import { Request, Response } from "express"; 

import { refreshPlaylist } from "../../libs/spotify/refreshPlaylist";

const refresh = async (req: Request, res: Response) => {
  const { playlistId } = req.params;

  refreshPlaylist(playlistId);

  res.json({ status: "Success" });
}

export default refresh