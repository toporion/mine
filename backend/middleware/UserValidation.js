const Joi = require('joi')

const signupValidation = (req, res, next) => {
    const userSchema = Joi.object({
        name: Joi.string().min(6).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(100).required(),
    })
    const { error } = userSchema.validate(req.body)
    if (error) {
        return res.status(401).json({ message: "please provide all info" })
    }
    next();
}
const loginValidation = (req, res, next) => {
    const userSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(100).required(),
    })
    const { error } = userSchema.validate(req.body)
    if (error) {
        return res.status(401).json({ message: "please provide all info" })
    }
    next();
}

module.exports={
    signupValidation,
    loginValidation

}

