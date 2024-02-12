"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaylistTracks = void 0;
const getPlaylist_1 = require("../../libs/spotify/getPlaylist");
const getPlaylistTracks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { playlistId } = req.params;
    const tracks = yield (0, getPlaylist_1.getPlaylistTracks)(user.spotify_id, playlistId, 0);
    res.json(tracks);
});
exports.getPlaylistTracks = getPlaylistTracks;
exports.default = exports.getPlaylistTracks;
//# sourceMappingURL=getPlaylistTracks.js.map