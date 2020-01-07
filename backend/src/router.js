const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");
const { verifyJWT } = require("./config/jwt");

const ProductController = require("./controllers/ProductController");
const ProductPhotosController = require("./controllers/ProductPhotosController");
const UserController = require("./controllers/UserController");
const LoginController = require("./controllers/LoginController");

const routers = express.Router();

routers.get("/", (req, res) => {
  return res.json({ message: "Olá, Bem-vindo ao meu primeiro e-commerce" });
});

routers.get("/products", ProductController.index);
routers.get("/product-search/:searchInput", ProductController.search);
routers.get("/product/:id_product", ProductPhotosController.index);
routers.get("/user/:id_user", UserController.index);
routers.get("/verify-token/:token", LoginController.verify_token);

routers.post("/new-product", ProductController.store);
routers.post(
  "/new-product/:id_product/photos",
  multer(multerConfig).single("file"),
  ProductPhotosController.store
);
routers.post("/new-user", UserController.store);
routers.post("/login", LoginController.login);

routers.put("/product/:id_product", ProductController.update);
routers.put("/user/:id_user", UserController.update);

routers.delete("/product/:id_product", ProductController.delete);
routers.delete("/photos/:id_photo", ProductPhotosController.delete);
routers.delete("/user/:id_user", UserController.delete);

module.exports = routers;
