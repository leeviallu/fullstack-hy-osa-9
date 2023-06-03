import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Diagnosis } from "../../types";

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
                    <h3>entries</h3>
                    {patient.entries.map((entry, idx) => {
                        return (
                            <div key={idx}>
                                <p>
                                    {entry.date} {entry.description}
                                </p>
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
                                            return <li key={idx}>{code}</li>;
                                        }
                                        return null;
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
};
export default PatientPage;
