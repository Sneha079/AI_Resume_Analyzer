import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/resumeRoutes.js";

const app = express();

//middleware 
// app.use(cors());

app.use(cors({
    origin: "https://ai-resume-analyzer-1-92ag.onrender.com",
    methods: ["GET","POST"]
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend working")
});


app.use("/api/resume", resumeRoutes);

export default app;
