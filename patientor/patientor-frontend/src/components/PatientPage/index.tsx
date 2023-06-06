import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    HealthCheckEntry,
    HospitalEntry,
    OccupationalHealthcareEntry,
    Patient,
    PatientFormValues,
} from "../../types";
import patientService from "../../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import WorkIcon from "@mui/icons-material/Work";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Diagnosis, Entry } from "../../types";
import AddEntryForm from "./AddEntryForm";
import entriesService from "../../services/entries";

const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[] | undefined }) => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient>();
    useEffect(() => {
        const fetchPatientData = async () => {
            const patient = await patientService.getPatientData(id);
            setPatient(patient);
        };
        void fetchPatientData();
    }, [id]);

    const HospitalEntry = ({ entry }: { entry: HospitalEntry }) => (
        <div
            style={{
                border: "2px solid rgba(0, 0, 0, 0.5)",
                borderRadius: "5px",
                padding: "8px",
            }}
        >
            <p>
                {entry.date}
                <LocalHospitalIcon />
            </p>
            <p>{entry.description}</p>
            <ul>
                {entry.diagnosisCodes?.map((code, idx) => {
                    if (diagnoses) {
                        const diagnosis = diagnoses.find(
                            (d) => d.code === code
                        );
                        if (diagnosis) {
                            return (
                                <li key={idx}>
                                    {code} {diagnosis.name}
                                </li>
                            );
                        }
                        return <li key={idx}>{code} </li>;
                    }
                    return null;
                })}
            </ul>
            <div
                style={{
                    border: "2px solid rgba(0, 0, 0, 0.5)",
                    borderRadius: "5px",
                    padding: "8px",
                }}
            >
                <h4>discharge:</h4>
                {entry.discharge.date}
                <br />
                {entry.discharge.criteria}
            </div>
            <p>diagnose by {entry.specialist}</p>
        </div>
    );

    const OccupationalHealthcareEntry = ({
        entry,
    }: {
        entry: OccupationalHealthcareEntry;
    }) => (
        <div
            style={{
                border: "2px solid rgba(0, 0, 0, 0.5)",
                borderRadius: "5px",
                padding: "8px",
            }}
        >
            <p>
                {entry.date}
                <WorkIcon />
                {entry.employerName}
            </p>
            <p>{entry.description}</p>
            <ul>
                {entry.diagnosisCodes?.map((code, idx) => {
                    if (diagnoses) {
                        const diagnosis = diagnoses.find(
                            (d) => d.code === code
                        );
                        if (diagnosis) {
                            return (
                                <li key={idx}>
                                    {code} {diagnosis.name}
                                </li>
                            );
                        }
                        return <li key={idx}>{code} </li>;
                    }
                    return null;
                })}
            </ul>
            {entry.sickLeave ? (
                <div
                    style={{
                        border: "2px solid rgba(0, 0, 0, 0.5)",
                        borderRadius: "5px",
                        padding: "8px",
                    }}
                >
                    <h4>sick leave</h4>
                    start date: {entry.sickLeave.startDate}
                    <br />
                    end date: {entry.sickLeave.endDate}
                </div>
            ) : null}
            <p>diagnose by {entry.specialist}</p>
        </div>
    );
    const HealthCheckEntry = ({ entry }: { entry: HealthCheckEntry }) => (
        <div
            style={{
                border: "2px solid rgba(0, 0, 0, 0.5)",
                borderRadius: "5px",
                padding: "8px",
            }}
        >
            <p>
                {entry.date}
                <MedicalServicesIcon />
            </p>
            <p>{entry.description}</p>
            {entry.healthCheckRating === 0 ? (
                <FavoriteIcon style={{ color: "green" }} />
            ) : entry.healthCheckRating === 1 ? (
                <FavoriteIcon style={{ color: "yellow" }} />
            ) : entry.healthCheckRating === 2 ? (
                <FavoriteIcon style={{ color: "grey" }} />
            ) : entry.healthCheckRating === 3 ? (
                <FavoriteIcon style={{ color: "black" }} />
            ) : null}
            <ul>
                {entry.diagnosisCodes?.map((code, idx) => {
                    if (diagnoses) {
                        const diagnosis = diagnoses.find(
                            (d) => d.code === code
                        );
                        if (diagnosis) {
                            return (
                                <li key={idx}>
                                    {code} {diagnosis.name}
                                </li>
                            );
                        }
                        return <li key={idx}>{code} </li>;
                    }
                    return null;
                })}
            </ul>
            <p>diagnose by {entry.specialist}</p>
        </div>
    );

    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
        switch (entry.type) {
            case "Hospital":
                return <HospitalEntry entry={entry} />;
            case "OccupationalHealthcare":
                return <OccupationalHealthcareEntry entry={entry} />;
            case "HealthCheck":
                return <HealthCheckEntry entry={entry} />;
            default:
                return assertNever(entry);
        }
    };
    return (
        <div>
            {patient ? (
                <div>
                    <h2>
                        {patient.name}{" "}
                        {patient.gender === "other" ? (
                            <TransgenderIcon />
                        ) : patient.gender === "male" ? (
                            <MaleIcon />
                        ) : (
                            <FemaleIcon />
                        )}
                    </h2>
                    <p>ssn: {patient.ssn}</p>
                    <p>occupation: {patient.occupation}</p>
                    {patient.entries.length > 0 ? (
                        <div>
                            <h3>entries</h3>
                            {patient.entries.map((entry, idx) => {
                                return <EntryDetails key={idx} entry={entry} />;
                            })}
                        </div>
                    ) : null}
                    <AddEntryForm
                        onCancel={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                        onSubmit={function (
                            values: Omit<HealthCheckEntry, "id">
                        ): void {
                            console.log(values);
                            entriesService.create(values, id);
                            window.location.reload();
                        }}
                    />
                </div>
            ) : null}
        </div>
    );
};
export default PatientPage;
