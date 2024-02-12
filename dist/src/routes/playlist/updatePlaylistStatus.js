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
exports.updatePlaylistStatus = void 0;
const playlist_1 = __importDefault(require("../../models/playlist"));
const user_1 = __importDefault(require("../../models/user"));
const refreshPlaylist_1 = require("../../libs/spotify/refreshPlaylist");
const updatePlaylistStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { playlistId } = req.params;
    const { status } = req.body;
    const playlist = yield playlist_1.default.findOne({ spotifyId: playlistId });
    if (!playlist) {
        const newPlaylist = yield playlist_1.default.create({
            spotifyId: playlistId,
            added_by: req.user._id,
            tracked: new Date(),
        });
        (0, refreshPlaylist_1.refreshPlaylist)(playlistId);
        return res.json(newPlaylist.toJSON());
    }
    const user = yield user_1.default.findOne({ _id: playlist.added_by });
    if (user._id.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (status === 'active' || status == true) {
        playlist.tracked = new Date();
    }
    else {
        playlist.tracked = null;
    }
    yield playlist.save();
    return res.json({
        playlist: {
            tracked: playlist.tracked,
        }
    });
});
exports.updatePlaylistStatus = updatePlaylistStatus;
exports.default = exports.updatePlaylistStatus;
//# sourceMappingURL=updatePlaylistStatus.js.map