"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const { name, email, password, passwordConfirmation } = data;
        if (password !== passwordConfirmation) {
            throw new Error('This passwords not match');
        }
        const emailAlreadyUsed = await this.userRepository.findByEmail(email);
        if (emailAlreadyUsed) {
            throw new Error('This email already used');
        }
        const user = await this.userRepository.create({ name, email, password });
        return user;
    }
}
exports.CreateUser = CreateUser;
