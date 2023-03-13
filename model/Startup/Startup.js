const Startup = (data) => {
    return {
      username: data.username,
      password: data.password,
      emailPerusahaan: data.emailPerusahaan,
      telpPerusahaan: data.telpPerusahaan,
      namaPerusahaan: data.namaPerusahaan,
      bidangPerusahaan: data.bidangPerusahaan,
      lokasi : data.lokasi,
      jumlahAnggota : data.jumlahAnggota,
      website : data.website
    };
  };
  
  module.exports.Startup = Startup;
  