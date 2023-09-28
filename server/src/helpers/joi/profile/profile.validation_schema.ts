import Joi from "joi";

const createProfileSchema = Joi.object().keys({
    name: Joi.string().trim().required(),
    age: Joi.number().positive().integer().required(),
    description: Joi.string().trim().allow(null).default(null),
    dob: Joi.date().required()
})

export { createProfileSchema }