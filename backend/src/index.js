import express from "express";
import dotnev from "dotenv";
import cors from "cors";
import morgan from "morgan";
import "./config/mongoConfig.js";

dotnev.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(morgan("dev"));

app.use("/", (req, res) => {
  res.status(200).json({ message: "OK!" });
});

app.listen(PORT, () => `Server is running on http://localhost:${PORT}`);
