import express from "express";
import { db } from "./prisma/db";
import cors from "cors";

const app = express();
const port = 3001;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  })
);

app.listen(port, () => {
  console.log(`PokeTracker server listening on port ${port}`);
});

// get all pokemon
app.get(`/api/pokemon`, async (req, res) => {
  const get = await db.pokemon.findMany();
  res.json(get);
});

// get pokemon per pokedex number
app.get(`/api/pokemon/:dex_number`, async (req, res) => {
  const { dex_number } = req.params;
  const data = await db.pokemon.findUnique({
    where: { dex_number: Number(dex_number) },
  });
  if (data != null) {
    res.json(data);
  } else {
    res.json({
      error: `Pokemon with pokedex number ${dex_number} does not exist in the database`,
    });
  }
});

// get all users
app.get(`/api/users`, async (req, res) => {
  const get = await db.user.findMany();
  res.json(get);
});

// get user per user id
app.get(`/api/users/:id`, async (req, res) => {
  const { id } = req.params;
  const data = await db.user.findUnique({
    where: { id: Number(id) },
  });
  if (data != null) {
    res.json(data);
  } else {
    res.json({
      error: `User with user id ${id} does not exist in the database`,
    });
  }
});


// create pokemon data
// example json req.body:
// {
//   "name": "gholdengo",
// 	"dex_number": 1000,
// 	"type_1": "steel",
// 	"type_2": "ghost",
// 	"image_url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1000.png"
// }
app.post(`/api/pokemon`, async (req, res) => {
  const { name, dex_number, type_1, type_2, image_url } = req.body;
  const result = await db.pokemon.create({
    data: {
      name,
      dex_number,
      type_1,
      type_2,
      image_url,
    },
  });
  res.json(result);
});

// modify pokemon data per pokedex number
// example json req.body:
// {
//   "name": "gholdengo",
// 	"dex_number": 1000,
// 	"type_1": "steel",
// 	"type_2": "ghost",
// 	"image_url": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1000.png"
// }
app.put(`/api/pokemon/:dex`, async (req, res) => {
  const { dex } = req.params;
  const { name, dex_number, type_1, type_2, image_url } = req.body;
  try {
    const post = await db.pokemon.update({
      where: { dex_number: Number(dex) },
      data: {
        name,
        dex_number,
        type_1,
        type_2,
        image_url,
      },
    });
    res.json(post);
  } catch (error) {
    res.json({
      error: `Pokemon with Pokedex number ${dex} does not exist in the database`,
    });
  }
});

// delete pokemon data per pokedex number
app.delete(`/api/pokemon/:dex_number`, async (req, res) => {
  const { dex_number } = req.params;
  try {
    const post = await db.pokemon.delete({
      where: {
        dex_number: Number(dex_number),
      },
    });
    res.json(post);
  } catch (error) {
    res.json({
      error: `Pokemon with Pokedex number ${dex_number} does not exist in the database`,
    });
  }
});
