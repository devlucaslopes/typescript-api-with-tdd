"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpController = void 0;
class SignUpController {
    constructor(createUser) {
        this.createUser = createUser;
    }
    async handle(request) {
        try {
            const { name, email, password, passwordConfirmation } = request.body;
            const user = await this.createUser.execute({
                name,
                email,
                password,
                passwordConfirmation,
            });
            return { statusCode: 200, body: user };
        }
        catch (error) {
            return { statusCode: 400, body: { message: error.message } };
        }
    }
}
exports.SignUpController = SignUpController;
