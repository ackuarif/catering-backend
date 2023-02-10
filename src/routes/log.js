import { Router } from "express";
import * as LogController from "../controllers/LogController";

export const routes = Router();

routes.post("/addLog", LogController.addLog);
