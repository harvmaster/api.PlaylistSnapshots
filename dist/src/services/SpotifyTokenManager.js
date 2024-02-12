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
exports.SpotifyTokenManager = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
const user_1 = __importDefault(require("../models/user"));
class SpotifyTokenManager {
    constructor() {
        this.users = new Map();
    }
    getToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.get(userId);
            if (user && user.expires_in > Date.now()) {
                return user;
            }
            const token = yield this.refreshToken(userId);
            this.users.set(userId, token);
            return token;
        });
    }
    refreshToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({ spotifyId: userId });
            if (!user) {
                throw new Error('User not found');
            }
            try {
                const { data } = yield axios_1.default.post('https://accounts.spotify.com/api/token', {
                    refresh_token: user.refreshToken,
                    grant_type: 'refresh_token',
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Basic ${Buffer.from(`${config_1.default.spotify.client_id}:${config_1.default.spotify.client_secret}`).toString('base64')}`
                    }
                });
                const token = {
                    token: data.access_token,
                    expires_in: data.expires_in
                };
                this.users.set(userId, token);
                return token;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
}
exports.SpotifyTokenManager = SpotifyTokenManager;
const spotifyTokenManager = new SpotifyTokenManager();
exports.default = spotifyTokenManager;
//# sourceMappingURL=SpotifyTokenManager.js.map