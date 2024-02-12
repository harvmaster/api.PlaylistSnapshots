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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const mongoose_1 = __importDefault(require("./services/mongoose"));
const config_1 = __importDefault(require("../config"));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    // Mongoose / MongoDB
    try {
        console.log('Connecting to MongoDB');
        yield mongoose_1.default.connect();
        console.log('Connected to MongoDB');
    }
    catch (err) {
        console.error(err.message);
    }
    // ExpressJS middleware, routes, etc
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: '*'
    }));
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.raw({ type: '*/*' }));
    app.use(routes_1.default);
    // Set port and start ExpressJS Server
    const server = app.listen(config_1.default.port);
    const address = server.address();
    console.log('Starting ExpressJS server');
    console.log(`ExpressJS listening at http://${address.address}:${address.port}`);
});
start();
//# sourceMappingURL=app.js.map