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
exports.getUserPlaylists = void 0;
const axios_1 = __importDefault(require("axios"));
const SpotifyTokenManager_1 = __importDefault(require("../../services/SpotifyTokenManager"));
const formatPlaylist_1 = require("./formatPlaylist");
const getUserPlaylists = (userId, offset = 0) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield SpotifyTokenManager_1.default.getToken(userId);
    const playlists = [];
    const { data } = yield axios_1.default.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
            Authorization: `Bearer ${token.token}`
        },
        params: {
            limit: 50,
            offset
        }
    });
    if (data.total > offset + 50) {
        const nextPlaylists = yield (0, exports.getUserPlaylists)(userId, offset + 50);
        playlists.push(...nextPlaylists.reverse());
    }
    const formatted = data.items.map(formatPlaylist_1.formatPlaylist);
    playlists.push(...formatted.reverse());
    return playlists.reverse();
});
exports.getUserPlaylists = getUserPlaylists;
//# sourceMappingURL=getUserPlaylists.js.map