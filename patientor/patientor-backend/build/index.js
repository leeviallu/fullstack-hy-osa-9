"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var diagnoses_1 = __importDefault(require("./data/diagnoses"));
var patients_1 = require("./data/patients");
var app = (0, express_1.default)();
app.use(express_1.default.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)());
app.get("/api/ping", function (_req, res) {
    res.send("pong");
});
app.get("/api/diagnoses", function (_req, res) {
    res.send(diagnoses_1.default);
});
app.get("/api/patients", function (_req, res) {
    res.send(patients_1.nonSensitivePatientData);
});
var PORT = 3001;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
