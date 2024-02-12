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
exports.refreshPlaylist = void 0;
const axios_1 = __importDefault(require("axios"));
const SpotifyTokenManager_1 = __importDefault(require("../../services/SpotifyTokenManager"));
const playlist_1 = __importDefault(require("../../models/playlist"));
const user_1 = __importDefault(require("../../models/user"));
const playlistEvent_1 = __importDefault(require("../../models/playlistEvent"));
const refreshPlaylist = (playlistId) => __awaiter(void 0, void 0, void 0, function* () {
    const playlist = yield playlist_1.default.findOne({ spotifyId: playlistId });
    const user = yield user_1.default.findOne({ _id: playlist.added_by });
    const token = yield SpotifyTokenManager_1.default.getToken(user.spotifyId);
    console.log(token);
    const response = yield axios_1.default.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
            'Authorization': `Bearer ${token.token}`
        }
    });
    const tracks = response.data.items.map((item) => {
        return {
            spotifyId: item.track.id,
            name: item.track.name,
            artist: item.track.artists[0].name,
            album: item.track.album.name,
            duration: item.track.duration_ms,
            album_cover: item.track.album.images[0].url,
        };
    });
    const currentTracks = yield playlistEvent_1.default.getCurrentState(playlist._id);
    const tracksToAdd = tracks.filter((track) => {
        return !currentTracks.find((currentTrack) => currentTrack.spotifyId === track.spotifyId);
    });
    const tracksToRemove = currentTracks.filter((track) => {
        return !tracks.find((currentTrack) => currentTrack.spotifyId === track.spotifyId);
    });
    // await Promise.all(tracksToAdd.map(async (track: any) => {
    //   const newTrack = await Event.create({
    //     track: track._id,
    //     playlist: playlist._id,
    //     event_type: 'add',
    //     create_date: track.added_at,
    //   })
    //   return newTrack
    // }))
    // await Promise.all(tracksToRemove.map(async (track: any) => {
    //   const newTrack = await Event.create({
    //     track: track._id,
    //     playlist: playlist._id,
    //     event_type: 'remove',
    //   })
    //   return newTrack
    // }))
    return console.log(currentTracks, tracksToAdd, tracksToRemove);
    yield playlist_1.default.updateOne({ spotifyId: playlistId }, { last_snapshot: Date.now() });
    return tracks;
});
exports.refreshPlaylist = refreshPlaylist;
//# sourceMappingURL=refreshPlaylist.js.map