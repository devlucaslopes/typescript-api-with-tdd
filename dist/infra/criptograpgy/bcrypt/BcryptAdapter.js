"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptAdapter = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class BcryptAdapter {
    constructor(salt) {
        this.salt = salt;
    }
    async hash(value) {
        const hashedValue = await bcrypt_1.default.hash(value, this.salt);
        return hashedValue;
    }
}
exports.BcryptAdapter = BcryptAdapter;
