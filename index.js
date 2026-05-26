const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let markers = [
  {
    id: 1,
    lat: 18.4861,
    lng: -69.9312,
    title: "Punto 1",
    status: "pending",
  },
  {
    id: 2,
    lat: 18.5,
    lng: -69.9,
    title: "Punto 2",
    status: "pending",
  },
];

app.get("/", (req, res) => {
  res.send("Voltia Backend funcionando");
});

app.get("/markers", (req, res) => {
  res.json(markers);
});

app.listen(PORT, () => {
  console.log(`Voltia Backend corriendo en http://localhost:${PORT}`);
});