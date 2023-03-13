const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("./creds.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const verify = require("./verifyToken");
const {
  registerUserValidation,
  loginUserValidation,
} = require("./model/User/userValidation");
const { User } = require("./model/User/User");
const {
  registerStartupValidation,
  loginStartupValidation,
} = require("./model/Startup/startupValidation");
const { Startup } = require("./model/Startup/Startup");
const {
  registerAdministratorValidation, loginAdministratorValidation,
} = require("./model/Administrator/administratorValidation");
const { Administrator } = require("./model/Administrator/Administrator");

const app = express();
const port = 80;

const userDb = db.collection("users").doc("user");
const startupDb = db.collection("users").doc("startupUser");
const adminDb = db.collection("users").doc("admin");

app.use(express.json());
app.use(cors());

// User Biasa atau Investor
app.post("/register/user", async (req, res) => {
  const { error } = registerUserValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const dataUser = User({
    username: req.body.username,
    password: hashPassword,
    email: req.body.email,
    namaLengkap: req.body.namaLengkap,
    telp: req.body.telp,
    namaPerusahaan: req.body.namaPerusahaan,
    bidangPerusahaan: req.body.bidangPerusahaan,
    ktp: req.body.ktp,
  });

  try {
    await userDb.set(dataUser);
    res.send(dataUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/login/user", async (req, res) => {
  const { error } = loginUserValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const dataUser = await userDb.get();

  const validPass = await bcrypt.compare(
    req.body.password,
    dataUser.data().password
  );

  if (dataUser.data().username !== req.body.username)
    return res.status(400).send("Email anda salah!");
  if (!validPass) return res.status(400).send("Password anda salah!");

  const token = jwt.sign({ _id: dataUser.id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

// Startup User
app.post("/register/startup", async (req, res) => {
  const { error } = registerStartupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const dataUser = Startup({
    username: req.body.username,
    password: hashPassword,
    emailPerusahaan: req.body.emailPerusahaan,
    telpPerusahaan: req.body.telpPerusahaan,
    namaPerusahaan: req.body.namaPerusahaan,
    bidangPerusahaan: req.body.bidangPerusahaan,
    lokasi: req.body.lokasi,
    jumlahAnggota: req.body.jumlahAnggota,
    website: req.body.website,
  });

  try {
    await startupDb.set(dataUser);
    res.send(dataUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/login/startup", async (req, res) => {
  const { error } = loginStartupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const dataUser = await startupDb.get();

  const validPass = await bcrypt.compare(
    req.body.password,
    dataUser.data().password
  );

  if (dataUser.data().username !== req.body.username)
    return res.status(400).send("Email anda salah!");
  if (!validPass) return res.status(400).send("Password anda salah!");

  const token = jwt.sign({ _id: dataUser.id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

// Administrator User
app.post("/register/admin", async (req, res) => {
  const { error } = registerAdministratorValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const dataUser = Administrator({
    username: req.body.username,
    password: hashPassword,
  });

  try {
    await adminDb.set(dataUser);
    res.send(dataUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/login/admin", async (req, res) => {
  const { error } = loginAdministratorValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const dataUser = await adminDb.get();

  const validPass = await bcrypt.compare(
    req.body.password,
    dataUser.data().password
  );

  if (dataUser.data().username !== req.body.username)
    return res.status(400).send("Email anda salah!");
  if (!validPass) return res.status(400).send("Password anda salah!");

  const token = jwt.sign({ _id: dataUser.id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});


// List Startup
app.get("/", verify, (req, res) => {
  res.json({
    startup: {
      namaStartup: "Alpha Startup",
      description: "Startup bergerak di bidang teknologi",
    },
  });
});

app.listen(port, () => {
  console.log("Server berhasil berjalan");
});
