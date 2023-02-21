import { Router } from "express";
import * as ChatController from "../controllers/ChatController";
import * as Auth from "../middlewares/auth";

export const routes = Router();

routes.post("/addChatPelanggan", Auth.pelangganIsAuthenticated, ChatController.addChatPelanggan);
routes.post("/addChatAdmin", Auth.adminIsAuthenticated, ChatController.addChatAdmin);
routes.get("/getChatByPemesananId/:id", Auth.pelangganIsAuthenticated, ChatController.getChatByPemesananId);
routes.get("/getChatBalas", Auth.adminIsAuthenticated, ChatController.getChatBalas);
