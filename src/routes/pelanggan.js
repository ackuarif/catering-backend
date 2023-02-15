import { Router } from "express";
import * as PelangganController from "../controllers/PelangganController";
import * as Auth from "../middlewares/auth";

export const routes = Router();

routes.post("/", PelangganController.addPelanggan);
routes.post("/login", PelangganController.login);
routes.post("/logout", Auth.pelangganIsAuthenticated, PelangganController.login);
routes.put("/:id", Auth.pelangganIsAuthenticated, PelangganController.updatePelanggan);
routes.delete("/:id", Auth.adminIsAuthenticated, PelangganController.deletePelanggan);
routes.get("/getSelfUser", Auth.pelangganIsAuthenticated, PelangganController.getSelfUser);