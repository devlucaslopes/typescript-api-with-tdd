"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
class CreateUser {
    constructor(userRepository, hasher) {
        this.userRepository = userRepository;
        this.hasher = hasher;
    }
    async execute(data) {
        const { name, email, password } = data;
        const emailAlreadyUsed = await this.userRepository.findByEmail(email);
        if (emailAlreadyUsed) {
            throw new Error('This e-mail already used');
        }
        const hashedPassword = await this.hasher.hash(password);
        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        return user;
    }
}
exports.CreateUser = CreateUser;
