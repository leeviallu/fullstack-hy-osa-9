import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button } from "@mui/material";

import { HealthCheckEntry, HealthCheckRating } from "../../types";
import { parseString } from "../../utils";

interface Props {
    onSubmit: (values: Omit<HealthCheckEntry, "id">) => void;
}

const HealthCheckForm = ({ onSubmit }: Props) => {
    const [visible, setVisible] = useState(false);
    const type = "HealthCheck";
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [healthCheckRatingInput, setHealthCheckRatingInput] = useState("");
    const [diagnosisCodesInput, setDiagnosisCodesInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        const diagnosisCodes: string[] = diagnosisCodesInput.split(", ");
        const healthCheckRating: HealthCheckRating | undefined = Number(
            healthCheckRatingInput
        );
        try {
            if (diagnosisCodes[0] === "") {
                const entry = onSubmit({
                    type,
                    description: parseString(description),
                    date: parseString(date),
                    specialist: parseString(specialist),
                    healthCheckRating,
                });
                return entry;
            }
            const entry = onSubmit({
                type,
                description: parseString(description),
                date: parseString(date),
                specialist: parseString(specialist),
                healthCheckRating,
                diagnosisCodes,
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
                New healthcheck entry
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
                    <select
                        value={healthCheckRatingInput}
                        onChange={({ target }) => {
                            setHealthCheckRatingInput(target.value);
                        }}
                        style={{ width: "100%", height: "50px" }}
                    >
                        <option value="0">Healthy: 0</option>
                        <option value="1">Low Risk: 1</option>
                        <option value="2">High Risk: 2</option>
                        <option value="3">Critical Risk: 3</option>
                    </select>
                    <TextField
                        label="Diagnosis codes"
                        placeholder='e.g. "S03.5, M24.2"'
                        fullWidth
                        value={diagnosisCodesInput}
                        onChange={({ target }) => {
                            setDiagnosisCodesInput(target.value);
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

export default HealthCheckForm;
