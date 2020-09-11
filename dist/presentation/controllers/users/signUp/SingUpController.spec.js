"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FakeUserRepository_1 = require("@/data/protocols/database/users/fakes/FakeUserRepository");
const CreateUser_1 = require("@/data/useCases/users/CreateUser");
const FakeHasher_1 = require("@/data/protocols/cryptography/fakes/FakeHasher");
const SignUpController_1 = require("./SignUpController");
let fakeHasher;
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
        fakeHasher = new FakeHasher_1.FakeHasher();
        fakeUserRepository = new FakeUserRepository_1.FakeUserRepository();
        createUser = new CreateUser_1.CreateUser(fakeUserRepository, fakeHasher);
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
});
