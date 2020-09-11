"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateUser = void 0;
const CreateUser_1 = require("@/data/useCases/users/CreateUser");
const UserRepository_1 = __importDefault(require("@/infra/typeorm/repositories/UserRepository"));
const BcryptAdapter_1 = require("@/infra/criptograpgy/bcrypt/BcryptAdapter");
exports.makeCreateUser = () => {
    const SALT = 12;
    const bcryptAdapter = new BcryptAdapter_1.BcryptAdapter(SALT);
    const userRepository = new UserRepository_1.default();
    return new CreateUser_1.CreateUser(userRepository, bcryptAdapter);
};
