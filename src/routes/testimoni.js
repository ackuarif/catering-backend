import { Router } from "express";
import * as TestimoniController from "../controllers/TestimoniController";
import * as Auth from "../middlewares/auth";

export const routes = Router();

routes.post("/", Auth.pelangganIsAuthenticated, TestimoniController.addTestimoni);
routes.get("/:pemesanan_id", Auth.pelangganIsAuthenticated, TestimoniController.getTestimoniByPemesananId);
routes.get("/getTestimoniByMenuId/:menu_id", TestimoniController.getTestimoniByMenuId);
routes.get("/getAvgRatingByMenuId/:menu_id", TestimoniController.getAvgRatingByMenuId);