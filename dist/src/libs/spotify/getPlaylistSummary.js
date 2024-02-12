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
exports.getPlaylistSummary = void 0;
const axios_1 = __importDefault(require("axios"));
const SpotifyTokenManager_1 = __importDefault(require("../../services/SpotifyTokenManager"));
const formatPlaylist_1 = __importDefault(require("./formatPlaylist"));
const getPlaylistSummary = (userId, playlistId) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield SpotifyTokenManager_1.default.getToken(userId);
    const { data } = yield axios_1.default.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
            Authorization: `Bearer ${token.token}`
        },
        params: {
            fields: 'id,name,description,images,tracks(total)'
        }
    });
    return (0, formatPlaylist_1.default)(data);
});
exports.getPlaylistSummary = getPlaylistSummary;
exports.default = exports.getPlaylistSummary;
//# sourceMappingURL=getPlaylistSummary.js.map