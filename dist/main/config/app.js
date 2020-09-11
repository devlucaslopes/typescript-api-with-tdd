"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../routes"));
const app = express_1.default();
exports.app = app;
app.use(express_1.default.json());
app.use(routes_1.default);
