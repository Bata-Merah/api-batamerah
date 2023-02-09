const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("./creds.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const express = require("express");
const cors = require("cors");

const app = express();
const port = 8000;
const alamatDb = db.collection("coba").doc("coba1");

app.use(express.json());
app.use(cors());

app.post("/create", async (req, res) => {
  const data  = req.body;

  await alamatDb.set(data);

  if (res.status(200)) {
    res.send("Data berhasil di tambahkan");
  } else {
    res.send("Data tidak berhasil di tambahkan");
  }
});

app.listen(port, () => {
  console.log("Server berhasil berjalan");
});
