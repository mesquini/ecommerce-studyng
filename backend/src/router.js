const express = require("express");
const multer = require("multer");
const multerConfig = require("../src/config/multer");
const ProductController = require("./controllers/ProductController");
const ProductPhotosController = require("./controllers/ProductPhotosController");

const routers = express.Router();

routers.get("/", (req, res) => {
  return res.json({ message: "Olá, Bem-vindo ao meu primeiro e-commerce" });
});

routers.get("/products", ProductController.index);
routers.get("/product/:id_product", ProductPhotosController.index);

routers.post("/new-product", ProductController.store);
routers.post(
  "/new-product/:id_product/photos",
  multer(multerConfig).single("file"),
  ProductPhotosController.store
);

routers.put('/product/:id_product', ProductController.update)

routers.delete("/product/:id_product", ProductController.delete);
routers.delete("/photos/:id_photo", ProductPhotosController.delete);

module.exports = routers;
