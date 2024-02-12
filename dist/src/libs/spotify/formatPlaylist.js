"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPlaylist = void 0;
const formatPlaylist = (playlist) => {
    var _a;
    return {
        id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        image: ((_a = playlist.images.sort((a, b) => b.height - a.height)[0]) === null || _a === void 0 ? void 0 : _a.url) || '',
        tracks: {
            total: playlist.tracks.total
        }
    };
};
exports.formatPlaylist = formatPlaylist;
exports.default = exports.formatPlaylist;
//# sourceMappingURL=formatPlaylist.js.map