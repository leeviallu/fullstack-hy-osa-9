import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button } from "@mui/material";

import { OccupationalHealthcareEntry } from "../../types";
import { parseString } from "../../utils";

interface Props {
    onSubmit: (values: Omit<OccupationalHealthcareEntry, "id">) => void;
}

const OccupationalHealthcareForm = ({ onSubmit }: Props) => {
    const [visible, setVisible] = useState(false);
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
            <h3>
                New occupational healthcare entry
                {!visible ? (
                    <button onClick={() => setVisible(true)}>show</button>
                ) : (
                    <button onClick={() => setVisible(false)}>hide</button>
                )}
            </h3>
            {visible ? (
                <form onSubmit={addEntry}>
                    <TextField
                        label="Description"
                        fullWidth
                        value={description}
                        onChange={({ target }) => setDescription(target.value)}
                    />
                    <TextField
                        type="date"
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
                    <h4>Sick leave:</h4>
                    Start date:
                    <TextField
                        type="date"
                        fullWidth
                        value={sickLeaveStart}
                        onChange={({ target }) => {
                            setSickLeaveStart(target.value);
                        }}
                    />
                    End date:
                    <TextField
                        type="date"
                        fullWidth
                        value={sickLeaveEnd}
                        onChange={({ target }) => {
                            setSickLeaveEnd(target.value);
                        }}
                    />
                    <Grid>
                        <Grid item>
                            <Button
                                style={{
                                    float: "left",
                                }}
                                type="submit"
                                variant="contained"
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            ) : null}
        </div>
    );
};

export default OccupationalHealthcareForm;
