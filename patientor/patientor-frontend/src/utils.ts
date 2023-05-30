import { Patient, Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseString = (item: unknown) => {
    if (!item || !isString(item)) {
        throw new Error("Incorrect or missing " + item);
    }
};

const toNewPatientEntry = (object: Patient) => {
    const id = parseString(object.id);
    const name = parseString(object.name);
    const occupation = parseString(object.occupation);
    const gender: Gender = object.gender;
    const ssn = parseString(object.ssn);
    const dateOfBirth = parseString(object.dateOfBirth);

    const newEntry = {
        id,
        name,
        occupation,
        gender,
        ssn,
        dateOfBirth,
    };

    return newEntry;
};

export default toNewPatientEntry;
