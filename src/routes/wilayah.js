import { Router } from "express";
import * as WilayahController from "../controllers/WilayahController";
import * as Auth from "../middlewares/auth";

export const routes = Router();

routes.post("/", Auth.adminIsAuthenticated, WilayahController.addWilayah);
routes.put("/:id", Auth.adminIsAuthenticated, WilayahController.updateWilayah);
routes.delete("/:id", Auth.adminIsAuthenticated, WilayahController.deleteWilayah);
routes.get("/", WilayahController.getWilayahAll);
routes.get("/getWilayahById/:id", WilayahController.getWilayahById);
