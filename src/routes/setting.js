import { Router } from "express";
import * as SettingController from "../controllers/SettingController";

export const routes = Router();

routes.put("/", SettingController.updateSetting);
routes.get("/", SettingController.getSettingAll);
