import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import DbConnection from "./config/dbCon";
import { indexRouter } from "./routes";

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: true }));

const PORT = process.env.PORT || 8000;
DbConnection();
app.use("/api", indexRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
