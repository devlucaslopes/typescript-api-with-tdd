"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FakeUserRepository_1 = require("@/data/protocols/database/users/fakes/FakeUserRepository");
const FakeHasher_1 = require("@/data/protocols/cryptography/fakes/FakeHasher");
const CreateUser_1 = require("./CreateUser");
let fakeHasher;
let fakeUserRepository;
let createUser;
const makeFakeRequest = () => ({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
});
describe('# CreateUser use case', () => {
    beforeEach(() => {
        fakeHasher = new FakeHasher_1.FakeHasher();
        fakeUserRepository = new FakeUserRepository_1.FakeUserRepository();
        createUser = new CreateUser_1.CreateUser(fakeUserRepository, fakeHasher);
    });
    it('should calls UserRepository.findByEmail with correct email', async () => {
        const findByEmailSpy = jest.spyOn(fakeUserRepository, 'findByEmail');
        await createUser.execute(makeFakeRequest());
        expect(findByEmailSpy).toHaveBeenCalledWith('any_email@mail.com');
    });
    it('should throw error if UserRepository.findByEmail find a user', async () => {
        await createUser.execute(makeFakeRequest());
        const promise = createUser.execute(makeFakeRequest());
        await expect(promise).rejects.toThrow();
    });
    it('should calls Hasher.hash with correct password', async () => {
        const hashSpy = jest.spyOn(fakeHasher, 'hash');
        await createUser.execute(makeFakeRequest());
        expect(hashSpy).toHaveBeenCalledWith('any_password');
    });
    it('should calls UserRepository.create with correct values', async () => {
        const createSpy = jest.spyOn(fakeUserRepository, 'create');
        await createUser.execute(makeFakeRequest());
        expect(createSpy).toHaveBeenCalledWith({
            name: 'any_name',
            email: 'any_email@mail.com',
            password: 'hashed_value',
        });
    });
    it('should returns a new user on success', async () => {
        const response = await createUser.execute(makeFakeRequest());
        expect(response.id).toBe('any_id');
        expect(response.email).toBe('any_email@mail.com');
    });
});
