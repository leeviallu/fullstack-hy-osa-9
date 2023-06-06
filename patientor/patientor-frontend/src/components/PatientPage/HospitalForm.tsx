import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button } from "@mui/material";

import { HospitalEntry } from "../../types";
import { parseString } from "../../utils";

interface Props {
    onCancel: () => void;
    onSubmit: (values: Omit<HospitalEntry, "id">) => void;
}

const HospitalForm = ({ onCancel, onSubmit }: Props) => {
    const type = "Hospital";
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [diagnosisCodesInput, setDiagnosisCodesInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [dischargeDate, setDischargeDate] = useState("");
    const [dischargeCriteria, setDischargeCriteria] = useState("");

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();

        const diagnosisCodes: string[] = diagnosisCodesInput.split(", ");
        try {
            if (!(dischargeDate && dischargeCriteria)) {
                throw new Error();
            }
            let discharge: { date: string; criteria: string } = {
                date: parseString(dischargeDate),
                criteria: parseString(dischargeCriteria),
            };
            if (diagnosisCodes[0] === "") {
                const entry = onSubmit({
                    type,
                    description: parseString(description),
                    date: parseString(date),
                    specialist: parseString(specialist),
                    discharge,
                });
                return entry;
            }

            const entry = onSubmit({
                type,
                description: parseString(description),
                date: parseString(date),
                specialist: parseString(specialist),
                diagnosisCodes,
                discharge,
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
                <h3>New hospital entry</h3>
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
                    label="Diagnosis codes"
                    placeholder='e.g. "S03.5, M24.2"'
                    fullWidth
                    value={diagnosisCodesInput}
                    onChange={({ target }) => {
                        setDiagnosisCodesInput(target.value);
                    }}
                />
                <TextField
                    label="Discharge date"
                    placeholder="YYYY-MM-DD"
                    fullWidth
                    value={dischargeDate}
                    onChange={({ target }) => {
                        setDischargeDate(target.value);
                    }}
                />
                <TextField
                    label="Discharge criteria"
                    fullWidth
                    value={dischargeCriteria}
                    onChange={({ target }) => {
                        setDischargeCriteria(target.value);
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

export default HospitalForm;
