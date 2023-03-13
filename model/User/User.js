const User = (data) => {
  return {
    username: data.username,
    password: data.password,
    email: data.email,
    namaLengkap: data.namaLengkap,
    telp: data.telp,
    namaPerusahaan: data.namaPerusahaan,
    bidangPerusahaan: data.bidangPerusahaan,
    ktp: data.ktp,
  };
};

module.exports.User = User;
