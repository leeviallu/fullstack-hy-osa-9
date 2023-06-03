import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientPage = () => {
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
                </div>
            ) : (
                <p>Patient not found</p>
            )}
        </div>
    );
};
export default PatientPage;
