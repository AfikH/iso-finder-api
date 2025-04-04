"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorBreakdown = (error) => {
    switch (error) {
        default:
            console.error(error);
            return { status: 500, message: "An unknown error has accured." };
    }
};
exports.default = errorBreakdown;
