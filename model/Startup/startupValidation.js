const Joi = require("@hapi/joi");

const registerStartupValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    emailPerusahaan: Joi.string().min(6).required().email(),
    telpPerusahaan: Joi.string().min(6).required(),
    namaPerusahaan: Joi.string().min(6).required(),
    bidangPerusahaan: Joi.string().min(6).required(),
    lokasi: Joi.string().min(6).required(),
    jumlahAnggota: Joi.string().min(1).required(),
    website: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const loginStartupValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.registerStartupValidation = registerStartupValidation;
module.exports.loginStartupValidation = loginStartupValidation;

