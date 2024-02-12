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
exports.getUserInfo = void 0;
const axios_1 = __importDefault(require("axios"));
const SpotifyTokenManager_1 = __importDefault(require("../../services/SpotifyTokenManager"));
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const token = yield SpotifyTokenManager_1.default.getToken(user.spotify_id);
    const spotifyUser = yield axios_1.default.get('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: `Bearer ${token.token}`
        }
    });
    const response = {
        name: spotifyUser.data.display_name,
        avatar: spotifyUser.data.images[0].url,
        spotifyId: spotifyUser.data.id,
        id: user._id
    };
    res.json(response);
});
exports.getUserInfo = getUserInfo;
//# sourceMappingURL=getUserInfo.js.map