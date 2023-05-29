import { Router } from "express";
import * as KomplainController from "../controllers/KomplainController";
import * as Auth from "../middlewares/auth";

export const routes = Router();

routes.get("/getKomplainBalas", Auth.adminIsAuthenticated, KomplainController.getKomplainBalas);
routes.post("/", Auth.pelangganIsAuthenticated, KomplainController.addKomplain);
routes.post("/addKomplainAdmin", Auth.adminIsAuthenticated, KomplainController.addKomplainAdmin);
routes.get("/:user_id", [Auth.pelangganIsAuthenticated, Auth.adminIsAuthenticated], KomplainController.getKomplainAll);
