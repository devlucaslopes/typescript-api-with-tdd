"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeHasher = void 0;
class FakeHasher {
    async hash(value) {
        return 'hashed_value';
    }
}
exports.FakeHasher = FakeHasher;
