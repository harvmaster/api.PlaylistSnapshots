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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaylists = void 0;
const getUserPlaylists_1 = require("../../libs/spotify/getUserPlaylists");
const playlist_1 = __importDefault(require("../../models/playlist"));
// import { PlaylistI, UsersPlaylistsResponse } from "playlist-snapshots";
const getPlaylists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const spotifyPlaylistsPromise = (0, getUserPlaylists_1.getUserPlaylists)(user.spotify_id);
    const trackedPlaylistsPromise = playlist_1.default.find({ added_by: user._id });
    const [spotifyPlaylists, trackedPlaylists] = yield Promise.all([spotifyPlaylistsPromise, trackedPlaylistsPromise]);
    const playlists = spotifyPlaylists.map(playlist => {
        const trackedPlaylist = trackedPlaylists.find(trackedPlaylist => trackedPlaylist.spotify_id === playlist.id);
        return Object.assign(Object.assign({}, playlist), { tracked: trackedPlaylist ? trackedPlaylist.tracked : null, events: {
                total: -1
            } });
    });
    const response = {
        playlists: playlists
    };
    res.json(response);
});
exports.getPlaylists = getPlaylists;
exports.default = exports.getPlaylists;
//# sourceMappingURL=getPlaylists.js.map