import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button } from "@mui/material";

import { OccupationalHealthcareEntry } from "../../types";
import { parseString } from "../../utils";

interface Props {
    onCancel: () => void;
    onSubmit: (values: Omit<OccupationalHealthcareEntry, "id">) => void;
}

const OccupationalHealthcareForm = ({ onCancel, onSubmit }: Props) => {
    const type = "OccupationalHealthcare";
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [employerName, setEmployerName] = useState("");
    const [diagnosisCodesInput, setDiagnosisCodesInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [sickLeaveStart, setSickLeaveStart] = useState("");
    const [sickLeaveEnd, setSickLeaveEnd] = useState("");

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();

        let sickLeave: { startDate: string; endDate: string } | undefined;
        if (sickLeaveEnd && sickLeaveStart) {
            sickLeave = {
                startDate: parseString(sickLeaveStart),
                endDate: parseString(sickLeaveEnd),
            };
        }
        const diagnosisCodes: string[] = diagnosisCodesInput.split(", ");
        try {
            if (diagnosisCodes[0] === "") {
                const entry = onSubmit({
                    type,
                    description: parseString(description),
                    date: parseString(date),
                    specialist: parseString(specialist),
                    employerName: parseString(employerName),
                    sickLeave,
                });
                return entry;
            }

            const entry = onSubmit({
                type,
                description: parseString(description),
                date: parseString(date),
                specialist: parseString(specialist),
                diagnosisCodes,
                employerName: parseString(employerName),
                sickLeave,
            });
            return entry;
        } catch (error) {
            setErrorMessage("Adding entry failed, check input fields");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    };

    return (
        <div style={{ border: "dotted", padding: "10px" }}>
            {errorMessage ? (
                <p style={{ color: "red" }}>{errorMessage}</p>
            ) : null}
            <form onSubmit={addEntry}>
                <h3>New occupational healthcare entry</h3>
                <TextField
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                />
                <TextField
                    label="Date"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />
                <TextField
                    label="Specialist"
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                />
                <TextField
                    label="Employer name"
                    fullWidth
                    value={employerName}
                    onChange={({ target }) => {
                        setEmployerName(target.value);
                    }}
                />
                <TextField
                    label="Diagnosis codes"
                    placeholder='e.g. "S03.5, M24.2"'
                    fullWidth
                    value={diagnosisCodesInput}
                    onChange={({ target }) => {
                        setDiagnosisCodesInput(target.value);
                    }}
                />
                <TextField
                    label="Sick leave start date"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={sickLeaveStart}
                    onChange={({ target }) => {
                        setSickLeaveStart(target.value);
                    }}
                />
                <TextField
                    label="Sick leave end date"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={sickLeaveEnd}
                    onChange={({ target }) => {
                        setSickLeaveEnd(target.value);
                    }}
                />

                <Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{ float: "left" }}
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{
                                float: "right",
                            }}
                            type="submit"
                            variant="contained"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default OccupationalHealthcareForm;
