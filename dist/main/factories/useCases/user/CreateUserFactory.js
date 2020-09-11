"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateUser = void 0;
const Createuser_1 = require("@/data/useCases/user/Createuser");
const UserRepository_1 = __importDefault(require("@/infra/typeorm/repositories/UserRepository"));
exports.makeCreateUser = () => {
    const userRepository = new UserRepository_1.default();
    return new Createuser_1.CreateUser(userRepository);
};
