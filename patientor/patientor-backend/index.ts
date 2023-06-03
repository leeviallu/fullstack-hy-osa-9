/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import cors from "cors";
import { v1 as uuid } from "uuid";
import diagnosesData from "./data/diagnoses";
import patientData, { nonSensitivePatientData } from "./data/patients";

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

app.post("/api/patients", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id = uuid();
    const entries: never[] = [];
    const { name, occupation, dateOfBirth, gender } = req.body;
    const patient = {
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    };
    nonSensitivePatientData.push(patient);
    res.send(patient);
});

app.get("/api/patients/:id", (req, res) => {
    const id = req.params.id;
    const patient = patientData.find((p) => p.id === id);
    if (patient) {
        res.send(patient);
    } else {
        res.status(404).send("Patient not found");
    }
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
