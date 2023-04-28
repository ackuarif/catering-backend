import { Router } from "express";
import * as LogController from "../controllers/LogController";

export const routes = Router();

routes.post("/addLog", LogController.addLog);
routes.get("/getLogToday", LogController.getLogToday);
routes.get("/getJmlKunjunganPerMonth", LogController.getJmlKunjunganPerMonth);
