"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.error('Error:', error);
    if (error.name === 'TwilioError') {
        return res.status(500).json({
            error: 'Notification service temporarily unavailable',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
    res.status(500).json({
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
};
exports.errorHandler = errorHandler;
