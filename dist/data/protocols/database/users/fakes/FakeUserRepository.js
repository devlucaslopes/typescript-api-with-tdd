"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeUserRepository = void 0;
class FakeUserRepository {
    constructor() {
        this.users = [];
    }
    async findByEmail(email) {
        const checkUserExists = this.users.find(user => user.email === email);
        return checkUserExists;
    }
    async create({ name, email, password }) {
        const user = {
            id: 'any_id',
            name,
            email,
            password,
            created_at: new Date(),
            updated_at: new Date(),
        };
        this.users.push(user);
        return user;
    }
}
exports.FakeUserRepository = FakeUserRepository;
