"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignUpController = void 0;
const SignUpController_1 = require("@/presentation/controllers/users/signUp/SignUpController");
const CreateUserFactory_1 = require("../../useCases/user/CreateUserFactory");
exports.makeSignUpController = () => {
    return new SignUpController_1.SignUpController(CreateUserFactory_1.makeCreateUser());
};
