const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("./creds.json");
const { registerValidation, loginValidation } = require("./validation");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = 8000;
const alamatDb = db.collection("coba").doc("coba1");

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const data = {
    nama: req.body.nama,
    email: req.body.email,
    password: hashPassword,
  };

  try {
    await alamatDb.set(data);
    res.send("Registrasi Berhasil!");
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const dataUser = await alamatDb.get();

  const validPass = await bcrypt.compare(
    req.body.password,
    dataUser.data().password
  );

  if (dataUser.data().email !== req.body.email)
    return res.status(400).send("Email anda salah!");
  if (!validPass) return res.status(400).send("Password anda salah!");

  const token = jwt.sign({ _id: dataUser.id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);

  // res.send("Login berhasil");
});

app.listen(port, () => {
  console.log("Server berhasil berjalan");
});
