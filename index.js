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
} from "./src/routes";

dotenv.config();
const app = express();
const port = 3000;

app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/admin", AdminRoutes);
app.use("/api/pelanggan", PelangganRoutes);
app.use("/api/menu", MenuRoutes);
app.use("/api/keranjang", KeranjangRoutes);
app.use("/api/pemesanan", PemesananRoutes);
app.use("/api/chat", ChatRoutes);
app.use("/api/log", LogRoutes);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
