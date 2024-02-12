"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const jwt_secret = config_1.default.jwt_secret;
const validateAccessToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, jwt_secret, (err, user) => {
        if (err)
            return res.sendStatus(403);
        // @ts-ignore
        req.user = user;
        next();
    });
};
exports.validateAccessToken = validateAccessToken;
exports.default = exports.validateAccessToken;
//# sourceMappingURL=index.js.map