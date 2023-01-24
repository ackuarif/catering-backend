import { Router } from "express";
import * as KeranjangController from "../controllers/KeranjangController";
import * as Auth from "../middlewares/auth";

export const routes = Router();

routes.post("/", Auth.pelangganIsAuthenticated, KeranjangController.addKeranjang);
routes.delete("/:id", Auth.pelangganIsAuthenticated, KeranjangController.deleteKeranjang);
routes.get("/", Auth.pelangganIsAuthenticated, KeranjangController.getKeranjangAll);
