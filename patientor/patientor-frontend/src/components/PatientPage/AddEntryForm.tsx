import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button } from "@mui/material";

import { HealthCheckEntry, HealthCheckRating } from "../../types";
import { parseString } from "../../utils";

interface Props {
    onCancel: () => void;
    onSubmit: (values: Omit<HealthCheckEntry, "id">) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [healthCheckRatingInput, setHealthCheckRatingInput] = useState("");
    const [diagnosisCodesInput, setDiagnosisCodesInput] = useState("");

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        const type = "HealthCheck";
        const diagnosisCodes: string[] = diagnosisCodesInput.split(", ");
        const healthCheckRating: HealthCheckRating | undefined = Number(
            healthCheckRatingInput
        );
        if (diagnosisCodes[0] === "") {
            if (type === "HealthCheck") {
                const entry = onSubmit({
                    type,
                    description: parseString(description),
                    date: parseString(date),
                    specialist: parseString(specialist),
                    healthCheckRating,
                });
                return entry;
            }
        }
        if (type === "HealthCheck") {
            const entry = onSubmit({
                type,
                description: parseString(description),
                date: parseString(date),
                specialist: parseString(specialist),
                healthCheckRating,
                diagnosisCodes,
            });
            return entry;
        }
    };

    return (
        <div>
            <form onSubmit={addEntry}>
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
                    fullWidth
                    value={healthCheckRatingInput}
                    type="number"
                    onChange={({ target }) => {
                        setHealthCheckRatingInput(target.value);
                    }}
                />
                <TextField
                    label="Diagnosis codes"
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

export default AddEntryForm;
