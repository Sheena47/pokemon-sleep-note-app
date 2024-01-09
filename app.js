const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

app.use(cors());

app.get('/api/getPokemonImages', (req, res) => {
  const directoryPath = path.join(__dirname, 'public/pokemon');
  const files = fs.readdirSync(directoryPath).filter(file => file !== '.DS_Store');
  const imagePaths = files.map(file => `/pokemon/${file}`);
  res.json({ pokemonImages: imagePaths });
});

app.get('/api/getIngredientImages', (req, res) => {
  const ingredientDirectoryPath = path.join(__dirname, 'public/ingredients');
  const ingredientFiles = fs.readdirSync(ingredientDirectoryPath).filter(file => file !== '.DS_Store');
  const ingredientImagePaths = ingredientFiles.map(file => `/ingredients/${file}`);
  res.json({ ingredientImages: ingredientImagePaths });
});

app.get('/api/getBerryImages', (req, res) => {
  const berryDirectoryPath = path.join(__dirname, 'public/berries');
  const berryFiles = fs.readdirSync(berryDirectoryPath).filter(file => file !== '.DS_Store');
  const berryImagePaths = berryFiles.map(file => `/berries/${file}`);
  res.json({ berryImages: berryImagePaths });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});