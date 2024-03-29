import { Router } from "express";
import * as PemesananController from "../controllers/PemesananController";
import * as Auth from "../middlewares/auth";
import multer from "../libs/multer";

export const routes = Router();

routes.post("/", Auth.pelangganIsAuthenticated, PemesananController.addPemesanan);
routes.delete("/:id", Auth.pelangganIsAuthenticated, PemesananController.deletePemesanan);
routes.get("/", Auth.pelangganIsAuthenticated, PemesananController.getPemesananAll);
routes.get("/getById/:id", Auth.pelangganIsAuthenticated, PemesananController.getById);
routes.post("/addPembayaran", [Auth.pelangganIsAuthenticated, multer.single("bukti_bayar")], PemesananController.addPembayaran);

routes.get("/getPemesananUnpaid", Auth.adminIsAuthenticated, PemesananController.getPemesananUnpaid);
routes.get("/getPemesananVerif", Auth.adminIsAuthenticated, PemesananController.getPemesananVerif);
routes.get("/getPemesananProses", Auth.adminIsAuthenticated, PemesananController.getPemesananProses);
routes.get("/getPemesananSelesai", Auth.adminIsAuthenticated, PemesananController.getPemesananSelesai);
routes.post("/laporanPendapatanByDate", Auth.adminIsAuthenticated, PemesananController.laporanPendapatanByDate);
routes.post("/verifPemesanan/:id", Auth.adminIsAuthenticated, PemesananController.verifPemesanan);
routes.post("/selesaiPemesanan/:id", Auth.adminIsAuthenticated, PemesananController.selesaiPemesanan);
routes.get("/getJmlPemesananCurrentMonth", Auth.adminIsAuthenticated, PemesananController.getJmlPemesananCurrentMonth);
routes.get("/getJmlPemesananPrevMonth", Auth.adminIsAuthenticated, PemesananController.getJmlPemesananPrevMonth);
routes.get("/getPemesananHeaderById/:id", Auth.adminIsAuthenticated, PemesananController.getPemesananHeaderById);
routes.get("/getJmlPemesananPerMonth", Auth.adminIsAuthenticated, PemesananController.getJmlPemesananPerMonth);