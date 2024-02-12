"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const TrackSchema = new mongoose_1.Schema({
    spotify_id: {
        type: String,
    },
    name: {
        type: String,
    },
    artist: {
        type: String,
    },
    album: {
        type: String,
    },
    duration: {
        type: Number,
    },
    album_cover: {
        type: String,
    },
    create_date: {
        type: Date,
        default: Date.now,
    }
});
TrackSchema.methods.toRes = function () {
    return {
        id: this._id,
        spotify_id: this.spotify_id,
        name: this.name,
        artist: this.artist,
        album: this.album,
        duration: this.duration,
        album_cover: this.album_cover
    };
};
const Track = mongoose_1.default.model('Track', TrackSchema);
exports.default = Track;
//# sourceMappingURL=index.js.map