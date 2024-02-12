"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: 3000,
    client_url: 'https://www.playlistsnapshot.mc.hzuccon.com/#',
    mongoDB: 'mongodb://PlaylistSnapshots:z84873d17H848c9!@mongo/PlaylistSnapshots',
    jwt_secret: 'ze887eae7H087c1!',
    jwt_refresh_secret: '',
    spotify: {
        client_id: '044af621dd6443bb94fba0c2bffe9cea',
        client_secret: '4f748a497c5a493d8d29f3b010509766',
        redirect_uri: 'https://api.playlistsnapshot.mc.hzuccon.com/auth/spotify/callback',
        scopes: [
            'user-read-private',
            'user-read-email',
            'playlist-read-private',
            'playlist-read-collaborative',
            'playlist-modify-public',
            'playlist-modify-private',
            'user-library-read',
            'user-library-modify',
            'user-top-read',
            'user-read-recently-played',
            'user-follow-read',
        ]
    }
};
//# sourceMappingURL=config.js.map