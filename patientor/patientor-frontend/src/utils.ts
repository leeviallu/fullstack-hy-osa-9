import { Patient, Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseString = (item: unknown) => {
    if (!item || !isString(item)) {
        throw new Error("Incorrect or missing " + item);
    }
    return item;
};

const toNewPatientEntry = (object: any): Omit<Patient, "id" | "entries"> => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if (
        "name" in object &&
        "occupation" in object &&
        "gender" in object &&
        "ssn" in object &&
        "dateOfBirth" in object
    ) {
        const name = parseString(object.name);
        const occupation = parseString(object.occupation);
        const gender: Gender = object.gender;
        const ssn = parseString(object.ssn);
        const dateOfBirth = parseString(object.dateOfBirth);

        const newEntry = {
            name,
            occupation,
            gender,
            ssn,
            dateOfBirth,
        };

        return newEntry;
    }
    throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatientEntry;
