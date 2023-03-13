const Joi = require("@hapi/joi");

const registerAdministratorValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const loginAdministratorValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.registerAdministratorValidation = registerAdministratorValidation;
module.exports.loginAdministratorValidation = loginAdministratorValidation;

