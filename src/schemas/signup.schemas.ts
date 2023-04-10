import Joi from 'joi';

const patient = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    cpf: Joi.string().min(11).max(11).required()
});

const doctor = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    crmStateId: Joi.number().required(),
    crm: Joi.string().min(6).max(6).required(),
    specialtyId: Joi.number().required(),
    branchId: Joi.number().required()
});


export default { patient, doctor };