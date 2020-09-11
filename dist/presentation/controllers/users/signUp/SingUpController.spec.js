"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FakeUserRepository_1 = require("@/data/protocols/database/user/fake/FakeUserRepository");
const Createuser_1 = require("@/data/useCases/user/Createuser");
const SignUpController_1 = require("./SignUpController");
let fakeUserRepository;
let createUser;
let signUpController;
const makeFakeRequest = () => ({
    body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
    },
});
describe('# SignUp controller', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository_1.FakeUserRepository();
        createUser = new Createuser_1.CreateUser(fakeUserRepository);
        signUpController = new SignUpController_1.SignUpController(createUser);
    });
    it('should calls CreateUser.execute with correct values', async () => {
        const executeSpy = jest.spyOn(createUser, 'execute');
        await signUpController.handle(makeFakeRequest());
        expect(executeSpy).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'any_password',
            passwordConfirmation: 'any_password',
        });
    });
    it('should returns 200 and a new user on success', async () => {
        const { body, statusCode } = await signUpController.handle(makeFakeRequest());
        expect(statusCode).toBe(200);
        expect(body.name).toBe('any_name');
    });
    it('should throw if password not match', async () => {
        const { body, statusCode } = await signUpController.handle({
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'wrong_password',
            },
        });
        expect(statusCode).toBe(400);
        expect(body).toHaveProperty('message');
    });
});
