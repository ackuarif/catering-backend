import { Router } from "express";
import * as AdminController from "../controllers/AdminController";
import * as Auth from "../middlewares/auth";

export const routes = Router();

routes.post("/", Auth.adminIsAuthenticated, AdminController.addAdmin);
routes.get("/", Auth.adminIsAuthenticated, AdminController.getAdminAll);
routes.get("/getAdminById/:id", Auth.adminIsAuthenticated, AdminController.getAdminById);
routes.post("/login", AdminController.login);
routes.post("/logout", Auth.adminIsAuthenticated, AdminController.logout);
routes.put("/:id", Auth.adminIsAuthenticated, AdminController.updateAdmin);
routes.delete("/:id", Auth.adminIsAuthenticated, AdminController.deleteAdmin);
routes.get("/getSelfUser", Auth.adminIsAuthenticated, AdminController.getSelfUser);
