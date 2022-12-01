import express from "express";
import * as dotenv from "dotenv";
import connect from "./config/db.config.js";
import recipesRoutes from "./routes/recipe.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const port = process.env.PORT;
const dbName = process.env.MONGO_DATABASE;

const app = express();

app.use(express.json());
app.use("/recipe", recipesRoutes);
app.use("/user", userRoutes);

connect(dbName);

app.listen( port, () => { console.log(`App up and running on http://localhost:${port}`) });