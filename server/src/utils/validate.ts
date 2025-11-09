import { body } from "express-validator"

export const validateLogin = [
    body('username').trim().isString().isLength({ min: 3, max: 20 }).withMessage('Username must have between 3 and 20 characters').notEmpty().withMessage('Username field must not be empty'),
    body('password').trim().isString().isLength({ min: 8, max: 50 }).withMessage('Password must be atleast 8 characters long').notEmpty().withMessage('Password field must not be empty'),
]

export const validateCar = [
    body('make').trim().isString().withMessage('Invalid input field').notEmpty().withMessage('Make field must not be empty'),
    body('model').trim().isString().withMessage('Invalid input field').notEmpty().withMessage('Model field must not be empty'),
    body('variant').trim().isString().withMessage('Invalid input field').notEmpty().withMessage('Variant field must not be empty'),
    body('year').trim().isString().withMessage('Invalid input field').notEmpty().withMessage('Year field must not be empty'),
    body('mileage').trim().isString().withMessage('Invalid input field').notEmpty().withMessage('Mileage field must not be empty'),
    body('category').trim().isString().withMessage('Invalid input field').notEmpty().withMessage('Category field must not be empty'),
    body('transmission').trim().isString().withMessage('Invalid input field').notEmpty().withMessage('Transmission field must not be empty'),
    body('fuelType').trim().isString().withMessage('Invalid input field').notEmpty().withMessage('Fuel Type field must not be empty'),
    body('price').trim().isString().withMessage('Invalid input field').notEmpty().withMessage('Price field must not be empty'),
]

export const validateMessage = [
    body('name').trim().isString().withMessage('Invalid name field').notEmpty().withMessage('Name field must not be empty').isLength({ max: 100 }).withMessage('Name can’t be longer than 100 characters.'),
    body('email').trim().isString().withMessage('Invalid email field').notEmpty().withMessage('Email field must not be empty').isLength({ max: 254 }).withMessage('Email can’t be longer than 254 characters.').isEmail().withMessage('Invalid email address'),
    body('message').trim().isString().withMessage('Invalid message field').notEmpty().withMessage('Message field must not be empty').isLength({ max: 1000 }).withMessage('Message can’t be longer than 1000 characters.'),
]

export const validateBusinessEmail = [
    body('email').trim().isString().withMessage('Invalid email field').notEmpty().withMessage('Email field must not be empty').isLength({ max: 254 }).withMessage('Email can’t be longer than 254 characters.').isEmail().withMessage('Invalid email address')
]

export const validatePhone = [
    body('phone').trim().isString().withMessage('Invalid input field').notEmpty().withMessage('Phone number field must not be empty').isLength({ max: 100 }).withMessage('Please enter a valid number')
]

export const validateInstagramProfileLink = [
    body('instagramProfileLink').trim().isString().withMessage('Invalid input field').notEmpty().withMessage('Field must not be empty')
]

export const validateFacebookProfileLink = [
    body('facebookProfileLink').trim().isString().withMessage('Invalid input field').notEmpty().withMessage('Field must not be empty')
]

export const validateTiktokProfileLink = [
    body('tiktokProfileLink').trim().isString().withMessage('Invalid input field').notEmpty().withMessage('Field must not be empty')
]

export const validateCredentialsFields = [
    body('currentPassword').trim().isString().isLength({ min: 8, max: 50 }).withMessage('Current Password must be between 8 - 50 characters long').notEmpty().withMessage('Current Password field must not be empty'),
    body('newUsername').trim().isString().isLength({ min: 3, max: 20 }).withMessage('New Username must have between 3 and 20 characters').notEmpty().withMessage('New Username field must not be empty'),
    body('newPassword').trim().isString().isLength({ min: 8, max: 50 }).withMessage('New Password must be between 8 - 50 characters long').notEmpty().withMessage('New Password field must not be empty'),
    body('confirmNewPassword').trim().isString().isLength({ min: 8, max: 50 }).withMessage('Confirm New Password must be between 8 - 50 characters long').notEmpty().withMessage('Confirm New Password field must not be empty').custom((value, { req }) => {
        if(req.body.newPassword !== value) throw new Error('Passwords do not match');
        return true;
    })
]