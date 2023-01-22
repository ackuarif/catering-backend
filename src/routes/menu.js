import { Router } from "express";
import * as MenuController from "../controllers/MenuController";
import * as Auth from "../middlewares/auth";
import multer from "../libs/multer";

export const routes = Router();

routes.post("/", [Auth.adminIsAuthenticated, multer.single("gambar")], MenuController.addMenu);
routes.put("/:id", [Auth.adminIsAuthenticated, multer.single("gambar")], MenuController.updateMenu);
routes.delete("/:id", Auth.adminIsAuthenticated, MenuController.deleteMenu);
routes.get("/", MenuController.getMenuAll);
routes.get("/getMenuById/:id", MenuController.getMenuById);
