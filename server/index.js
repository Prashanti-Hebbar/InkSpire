import express from "express";
import dbconnection from "./db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

dbconnection();

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`server is running on PORT number ${PORT}`);
});