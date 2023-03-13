const Joi = require("@hapi/joi");

const registerUserValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    namaLengkap: Joi.string().min(6).required(),
    telp: Joi.string().min(6).required(),
    namaPerusahaan: Joi.string().min(6),
    bidangPerusahaan: Joi.string().min(6),
    ktp: Joi.string().min(6).required(), // harusnya dalam bentuk gambar
  });

  return schema.validate(data);
};

const loginUserValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.registerUserValidation = registerUserValidation;
module.exports.loginUserValidation = loginUserValidation;

