"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SignUpControllerFactory_1 = require("../factories/controllers/user/SignUpControllerFactory");
const express_routes_adapter_1 = require("../adapters/express-routes-adapter");
const signUpRouter = express_1.Router();
signUpRouter.post('/', express_routes_adapter_1.adaptRoute(SignUpControllerFactory_1.makeSignUpController()));
exports.default = signUpRouter;
