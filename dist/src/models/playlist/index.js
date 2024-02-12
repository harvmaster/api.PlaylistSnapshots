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
const PlaylistSchema = new mongoose_1.Schema({
    spotify_id: {
        type: String,
    },
    added_by: {
        type: String,
    },
    tracked: {
        type: Date
    },
    last_snapshot: {
        type: Date
    },
    create_date: {
        type: Date,
        default: Date.now,
    }
});
PlaylistSchema.methods.toRes = function () {
    return {
        id: this._id,
        spotify_id: this.spotify_id,
        added_by: this.added_by,
        tracked: this.tracked,
        last_snapshot: this.last_snapshot,
        createdAt: this.create_date,
    };
};
const Playlist = mongoose_1.default.model('playlist', PlaylistSchema);
exports.default = Playlist;
//# sourceMappingURL=index.js.map