import Joi from "joi";

// let verificarUsuario = () => {
const schema = Joi.object({
    nombre: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,10}$')),
        email: Joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
})
// }

export default schema;