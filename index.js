import express from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
	AdminRoutes,
	PelangganRoutes,
	MenuRoutes,
	KeranjangRoutes,
	PemesananRoutes,
	ChatRoutes,
	LogRoutes,
	SettingRoutes,
	KomplainRoutes,
	TestimoniRoutes,
} from "./src/routes";

dotenv.config();
const app = express();
const port = process.env.PORT;

process.env.TZ = "Asia/Jakarta";

app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(
	cors({
		origin: [process.env.CORS_URL, process.env.CORS_URL_ADMIN, process.env.CORS_WWW_URL],
		credentials: true,
	})
);

app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/admin", AdminRoutes);
app.use("/api/pelanggan", PelangganRoutes);
app.use("/api/menu", MenuRoutes);
app.use("/api/keranjang", KeranjangRoutes);
app.use("/api/pemesanan", PemesananRoutes);
app.use("/api/chat", ChatRoutes);
app.use("/api/log", LogRoutes);
app.use("/api/setting", SettingRoutes);
app.use("/api/komplain", KomplainRoutes);
app.use("/api/testimoni", TestimoniRoutes);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
