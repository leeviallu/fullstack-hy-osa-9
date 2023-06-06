import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button } from "@mui/material";

import { HospitalEntry } from "../../types";
import { parseString } from "../../utils";

interface Props {
    onSubmit: (values: Omit<HospitalEntry, "id">) => void;
}

const HospitalForm = ({ onSubmit }: Props) => {
    const [visible, setVisible] = useState(false);
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
            <h3>
                New hospital entry
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
                    <h4>Discharge:</h4>
                    <TextField
                        type="date"
                        fullWidth
                        value={dischargeDate}
                        onChange={({ target }) => {
                            setDischargeDate(target.value);
                        }}
                    />
                    <TextField
                        label="Criteria"
                        fullWidth
                        value={dischargeCriteria}
                        onChange={({ target }) => {
                            setDischargeCriteria(target.value);
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

export default HospitalForm;
