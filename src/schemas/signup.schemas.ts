import Joi from "joi";

const patient = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  cpf: Joi.string().min(11).max(11).required(),
});

const doctor = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
  crm_state: Joi.number().required(),
  crm: Joi.string().min(6).max(6).required(),
  specialty: Joi.number().required(),
  branch: Joi.number().required(),
});

export default { patient, doctor };
