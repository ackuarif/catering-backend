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
routes.post("/addMenuIsi", Auth.adminIsAuthenticated, MenuController.addMenuIsi);
routes.delete("/deleteMenuIsi", Auth.adminIsAuthenticated, MenuController.deleteMenuIsi);
routes.get("/getMenuIsiByMenuId/:menu_id", MenuController.getMenuIsiByMenuId);
routes.post("/addMenuGambar", Auth.adminIsAuthenticated, MenuController.addMenuGambar);
routes.delete("/deleteMenuGambar", Auth.adminIsAuthenticated, MenuController.deleteMenuGambar);
routes.get("/getMenuGambarByMenuId/:menu_id", MenuController.getMenuGambarByMenuId);
