"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../auth"));
const getPlaylists_1 = __importDefault(require("./getPlaylists"));
const getPlaylistTracks_1 = __importDefault(require("./getPlaylistTracks"));
const updatePlaylistStatus_1 = __importDefault(require("./updatePlaylistStatus"));
const router = express_1.default.Router();
router.get('/all', auth_1.default, getPlaylists_1.default);
router.get('/:playlistId', auth_1.default, getPlaylistTracks_1.default);
router.put('/:playlistId/status', auth_1.default, updatePlaylistStatus_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map