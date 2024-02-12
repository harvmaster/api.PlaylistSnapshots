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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaylistData = void 0;
const getPlaylist_1 = require("../../libs/spotify/getPlaylist");
const playlist_1 = __importDefault(require("../../models/playlist"));
const playlistEvent_1 = __importDefault(require("../../models/playlistEvent"));
const track_1 = __importDefault(require("../../models/track"));
const getPlaylistSummary_1 = __importDefault(require("../../libs/spotify/getPlaylistSummary"));
const getPlaylistData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { playlistId } = req.params;
    const spotifyTracks = yield (0, getPlaylist_1.getPlaylistTracks)(user.spotify_id, playlistId);
    const _a = yield (0, getPlaylistSummary_1.default)(user._id, playlistId), { id } = _a, spotifyPlaylist = __rest(_a, ["id"]);
    const playlist = yield playlist_1.default.findOne({ spotify_id: playlistId });
    const events = yield playlistEvent_1.default.find({ playlist_id: playlistId });
    const tracks = yield track_1.default.find({ _id: { $in: events.map(event => event.track_id) } });
    // Remove dupes from spotifyTracks and database tracks
    const responseTracks = {};
    tracks.forEach(track => {
        responseTracks[track.spotify_id] = track.toRes();
    });
    spotifyTracks.forEach(track => {
        responseTracks[track.id] = track;
    });
    const responsePlaylist = Object.assign(Object.assign(Object.assign({}, spotifyPlaylist), playlist.toRes()), { events: {
            total: events.length,
            items: events.map(event => event.toRes())
        } });
    const response = {
        playlist: responsePlaylist,
        tracks: responseTracks
    };
    res.json(response);
});
exports.getPlaylistData = getPlaylistData;
exports.default = exports.getPlaylistData;
//# sourceMappingURL=getPlaylistData.js.map