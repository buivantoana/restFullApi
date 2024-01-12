import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
} from "../controller/product";

let routerProduct = Router();
routerProduct.post("/", addProduct);
routerProduct.put("/:id", updateProduct);
routerProduct.delete("/:id", deleteProduct);
routerProduct.get("/:id", getOneProduct);
routerProduct.get("/", getAllProduct);

export default routerProduct;
