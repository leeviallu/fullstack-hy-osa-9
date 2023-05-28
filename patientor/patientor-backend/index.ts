import express from "express";
import cors from "cors";
import diagnosesData from "./data/diagnoses";
import { nonSensitivePatientData } from "./data/patients";
const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get("/api/ping", (_req, res) => {
    res.send("pong");
});

app.get("/api/diagnoses", (_req, res) => {
    res.send(diagnosesData);
});

app.get("/api/patients", (_req, res) => {
    res.send(nonSensitivePatientData);
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
