"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../auth"));
const createAuthRequest_1 = require("./createAuthRequest");
const handleAuthCallback_1 = require("./handleAuthCallback");
const getUserInfo_1 = require("./getUserInfo");
const router = express_1.default.Router();
router.get('/spotify', createAuthRequest_1.createAuthRequest);
router.get('/spotify/callback', handleAuthCallback_1.handleAuthCallback);
router.get('/me', auth_1.default, getUserInfo_1.getUserInfo);
exports.default = router;
//# sourceMappingURL=index.js.map