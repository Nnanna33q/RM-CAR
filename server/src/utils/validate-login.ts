import { body } from "express-validator"

export default [
    body('username').trim().isString().isLength({ min: 3, max: 20 }).withMessage('Username must have between 3 and 20 characters').notEmpty().withMessage('Username field must not be empty'),
    body('password').trim().isString().isLength({ min: 8, max: 50 }).withMessage('Password must be atleast 8 characters long').notEmpty().withMessage('Password field must not be empty'),
]