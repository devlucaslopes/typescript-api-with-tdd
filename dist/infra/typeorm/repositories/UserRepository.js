"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../entities/User"));
class UserRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(User_1.default);
    }
    async findByEmail(email) {
        const user = await this.ormRepository.findOne({ where: email });
        return user;
    }
    async create({ name, email, password }) {
        const user = this.ormRepository.create({ name, email, password });
        await this.ormRepository.save(user);
        return user;
    }
}
exports.default = UserRepository;
