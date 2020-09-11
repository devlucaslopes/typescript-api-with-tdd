"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const BcryptAdapter_1 = require("./BcryptAdapter");
const SALT = 12;
let bcryptAdapter;
jest.mock('bcrypt', () => ({
    async hash() {
        return Promise.resolve('hashed_value');
    },
}));
describe('# BcryptAdapter', () => {
    beforeEach(() => {
        bcryptAdapter = new BcryptAdapter_1.BcryptAdapter(SALT);
    });
    describe('hash()', () => {
        it('should be calls Bcrypt.hash with correct value', async () => {
            const hashSpy = jest.spyOn(bcrypt_1.default, 'hash');
            await bcryptAdapter.hash('any_value');
            expect(hashSpy).toHaveBeenCalledWith('any_value', SALT);
        });
        it('should returns hashed value on success', async () => {
            const hashedValue = await bcryptAdapter.hash('any_value');
            expect(hashedValue).toBe('hashed_value');
        });
    });
});
