"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptRoute = void 0;
exports.adaptRoute = (controller) => {
    return async (req, res) => {
        const httpRequest = {
            body: req.body,
        };
        const httpResponse = await controller.handle(httpRequest);
        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
            res.status(httpResponse.statusCode).json(httpResponse.body);
        }
        else {
            res.status(httpResponse.statusCode).json({
                error: httpResponse.body.message,
            });
        }
    };
};
