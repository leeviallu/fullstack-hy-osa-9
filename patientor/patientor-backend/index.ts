/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import cors from "cors";
import { v1 as uuid } from "uuid";
import diagnosesData from "./data/diagnoses";
import patientData from "./data/patients";
import { addEntry } from "./utils";

const nonSensitivePatientData = patientData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    })
);

const app = express();
app.use(express.json());
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
    const id = uuid();
    const entries: never[] = [];
    const { name, occupation, dateOfBirth, gender, ssn } = req.body;
    const nonSensitivePatient = {
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    };
    const patient = {
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
        ssn,
    };
    nonSensitivePatientData.push(nonSensitivePatient);
    patientData.push(patient);
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

app.get("/api/patients/:id/entries", (req, res) => {
    const id = req.params.id;
    const patient = patientData.find((p) => p.id === id);
    if (patient) {
        res.send(patient.entries);
    } else {
        res.status(404).send("Patient entries not found");
    }
});

app.post("/api/patients/:id/entries", (req, res) => {
    const patientId = req.params.id;
    const patient = patientData.find((p) => p.id === patientId);
    const {
        description,
        date,
        specialist,
        type,
        diagnosisCodes,
        healthCheckRating,
        employerName,
        sickLeave,
        discharge,
    } = req.body;

    const entryDetails = {
        description,
        date,
        specialist,
        type,
        diagnosisCodes,
        healthCheckRating,
        employerName,
        sickLeave,
        discharge,
    };
    const entry = addEntry(entryDetails);
    patient?.entries.push(entry);
    res.send(entry);
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
