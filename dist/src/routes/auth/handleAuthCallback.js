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
exports.handleAuthCallback = void 0;
const axios_1 = __importDefault(require("axios"));
const user_1 = __importDefault(require("../../models/user"));
const config_1 = __importDefault(require("../../../config"));
const handleAuthCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, error } = req.query;
    if (error) {
        res.status(400).json({ message: error });
        return;
    }
    if (!code) {
        res.status(400).json({ message: 'Missing code' });
        return;
    }
    const url = `https://accounts.spotify.com/api/token`;
    try {
        // Get access and refresh Token
        const { data } = yield axios_1.default.post(url, {
            code,
            redirect_uri: config_1.default.spotify.redirect_uri,
            grant_type: 'authorization_code',
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${config_1.default.spotify.client_id}:${config_1.default.spotify.client_secret}`).toString('base64')}`
            }
        });
        const userRes = yield axios_1.default.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${data.access_token}`
            }
        });
        // Check if user already exists
        const userExists = yield user_1.default.findOne({ spotifyId: userRes.data.id });
        if (userExists) {
            return res.redirect(`${config_1.default.client_url}/auth?token=${userExists.generateToken()}`);
        }
        // add user to database if they dont exist
        const user = new user_1.default({
            spotifyId: userRes.data.id,
            refreshToken: data.refresh_token
        });
        yield user.save();
        const userToken = user.generateToken();
        res.redirect(`${config_1.default.client_url}/auth?token=${userToken}`);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        return;
    }
});
exports.handleAuthCallback = handleAuthCallback;
exports.default = exports.handleAuthCallback;
//# sourceMappingURL=handleAuthCallback.js.map