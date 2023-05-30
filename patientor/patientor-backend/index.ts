/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import cors from "cors";
import diagnosesData from "./data/diagnoses";
import { nonSensitivePatientData } from "./data/patients";
import patientService from "../patientor-frontend/src/services/patients";
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
    const { name, occupation, ssn, dateOfBirth, gender } = req.body;
    const patient = {
        name,
        occupation,
        gender,
        ssn,
        dateOfBirth,
    };
    const addedPatient = patientService.create(patient);
    console.log("added", addedPatient);
    res.send(addedPatient);
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
