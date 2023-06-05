import { Entry, HealthCheckRating, Diagnosis } from "./types";
import { v1 as uuid } from "uuid";

export const addEntry = (entryDetails: {
    description: string;
    date: string;
    specialist: string;
    type: string;
    diagnosisCodes: Array<Diagnosis["code"]>;
    healthCheckRating: HealthCheckRating;
    employerName: string;
    sickLeave: { startDate: string; endDate: string } | undefined;
    discharge: { date: string; criteria: string };
}): Entry => {
    const {
        description,
        date,
        specialist,
        type,
        diagnosisCodes,
        healthCheckRating,
        employerName,
        sickLeave,
        discharge,
    } = entryDetails;

    if (type === "HealthCheck") {
        const newEntry: Entry = {
            id: uuid(),
            date,
            type,
            specialist,
            diagnosisCodes,
            description,
            healthCheckRating,
        };
        if (newEntry) {
            return newEntry;
        }
        throw new Error("Entry fails");
    }

    if (type === "OccupationalHealthcare") {
        const newEntry: Entry = {
            id: uuid(),
            date,
            specialist,
            type,
            diagnosisCodes,
            description,
            employerName,
            sickLeave,
        };
        if (newEntry) {
            return newEntry;
        }
        throw new Error("Entry fails");
    }

    if (type === "Hospital") {
        const newEntry: Entry = {
            id: uuid(),
            date,
            specialist,
            type,
            diagnosisCodes,
            description,
            discharge,
        };
        if (newEntry) {
            return newEntry;
        }
        throw new Error("Entry fails");
    }
    throw new Error("Entry fails");
};
