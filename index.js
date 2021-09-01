console.log("I am outside the browser");
const express = require("express");
const mongoose = require("mongoose");

//express object
const app = express();

app.use(express.json());

//localhost:8000--server address
//localhost:8000/dummy - get request
// app.get("/dummy", (req, res) => {
//   res.send("Hello you are on the right way!!");
// });

// app.post("/create", (req, res) => {
//   res.send("POST WORKING");
// });

//MONGODB server connection
mongoose.connect(
  "mongodb://localhost:27017/pokebase",
  { useNewUrlParser: true },
  () => console.log("Mongo server Connected!!")
);

//SCHEMA for 'pokemons' collection
const pokeSchema = new mongoose.Schema({
  name: String,
  type: String,
  imageUrl: String,
});

//MODEL- A reference of our collection
const pokeModel = new mongoose.model("pokemons", pokeSchema);

//Before this create a schema and a model

app.get("/pokemon", async (req, res) => {
  let data = await pokeModel.find();
  console.log(data);
  res.send(data);
});

//endpoint to create a pokemon

app.post("/pokemon", (req, res) => {
  let pokemon = req.body;
  let pokemonObj = new pokeModel(pokemon);
  pokemonObj.save((err, data) => {
    if (err === null) res.send({ message: "Pokemon Created" });
  });
  res.send({ message: "pokemon created" });
});
// function getData() {
//   pokeModel.findOne((err, data) => {
//     if (err === null) console.log(data);
//     else console.log(`Error! -- ${err}`);
//   });
// }

// getData();

// function getData() {
//   pokeModel.find().then((data)=>console.log(data))
// }
//Creation of server

//endpoint to delete a pokemon
app.delete("/pokemon/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);

  pokeModel.deleteOne({ _id: id }, (err, data) => {
    if (err === null) res.send({ message: "Deleted pokemon" });
  });
});

//endpoint to fetch a single pokemon based on id

app.get("/pokemon/:id", async (req, res) => {
  let id = req.params.id;
  let dataWithId = await pokeModel.find({ _id: id });
  console.log(dataWithId);
  res.send(dataWithId);
});

//endpoint to update a pokemon

app.put("/pokemon/:id", (req, res) => {
  let id = req.params.id;
  let pokeData = req.body;

  pokeModel.updateOne({ _id: id }, pokeData, (err, data) => {
    if (err === null) res.send("Pokemon updated!!");
  });
});

app.listen(8000, () => console.log("Running perfectly"));
