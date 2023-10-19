import Joi from "joi";

const schema = Joi.object({
        nombre: Joi.string()
                .alphanum()
                .min(3)
                .max(25)
                .required()
 })
   

export default schema;