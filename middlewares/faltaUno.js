import Joi from "joi";

const schema = Joi.object({
    cantJugador: Joi.number()
            .integer()
            .min(1)
            .max(2)
            .required(),
    deporte: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),
    horario: Joi.string()
            .alphanum()
            .min(2)
            .max(6)
            .required(),
    lugar: Joi.string()
            .regex(/^[a-zA-Z0-9\s]+$/)
            .min(2)
            .max(25)
            .required(),
    precio: Joi.number()
            .precision(2)
})

export default schema;