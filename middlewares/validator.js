import {check, validationResult} from "express-validator";

export const validateSignUp = [
    check('fullName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Fullname is missing!')
        .isLength({
            min: 3,
            max: 30
        })
        .withMessage("Fullname must be 3 t0 30 characters long!"),
    check('email')
        .isEmail()
        .withMessage("Email is invalid!"),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is missing!')
]


export const validateLogin = [
    check('email')
        .isEmail()
        .withMessage("Email is invalid!"),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is missing!')
]


export const validate = (req, res, next) => {
    const err = validationResult(req).array()
    if(!err.length){
       return next()
    }
    return res.status(400).json({
        message: err[0].msg
    })
}
