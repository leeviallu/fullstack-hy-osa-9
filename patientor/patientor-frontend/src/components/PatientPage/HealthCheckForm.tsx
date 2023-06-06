import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button } from "@mui/material";

import { HealthCheckEntry, HealthCheckRating } from "../../types";
import { parseString } from "../../utils";

interface Props {
    onCancel: () => void;
    onSubmit: (values: Omit<HealthCheckEntry, "id">) => void;
}

const HealthCheckForm = ({ onCancel, onSubmit }: Props) => {
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
            <form onSubmit={addEntry}>
                <h3>New healthcheck entry</h3>
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
                    label="Healthcheck Rating"
                    placeholder="0-4"
                    fullWidth
                    value={healthCheckRatingInput}
                    type="number"
                    onChange={({ target }) => {
                        setHealthCheckRatingInput(target.value);
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

export default HealthCheckForm;
