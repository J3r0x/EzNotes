import express from "express";
import notesRouter from "./routes/notesRoutes.js"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
dotenv.config()

const app = express();

app.use(express.json());

app.use("/api/notes", notesRouter);

const PORT = process.env.PORT || 3001;

connectDB()
.then(() =>{
    app.listen(PORT, () => {
    console.log(`Servidor levantado en puerto http://localhost:${PORT}`);
})
})

