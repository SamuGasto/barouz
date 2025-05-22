const sharp = require("sharp");

const images = [
  "1",
  "2",
  "3",
  "bebidas",
  "brownie",
  "churros-artesanales",
  "churros-chocolate",
  "churros-docena",
  "churros",
  "helado-artesanal",
  "helado-completo",
  "helado-frutilla",
  "helado-menta",
  "helado-sol",
  "jugo-naranja",
  "muchos-churros",
  "postre-avena",
  "postres",
  "smothie-chocolate",
  "smothie-frutilla",
  "waffle-basico",
  "waffle-chocolate",
  "waffle-cokies",
  "waffle-cookie",
  "waffle-crema",
  "waffle-frutilla",
  "waffle-helado",
  "waffle-nutella",
  "waffle"
];



images.forEach((image,index) => {
  sharp(`./products-example/${image}.jpg`)
    .resize({height: index > 3 ? 260 : 460})
    .webp()
    .toFile(`./products-example/${image}.webp`);
});
