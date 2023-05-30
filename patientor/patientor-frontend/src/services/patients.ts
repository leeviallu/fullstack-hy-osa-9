import axios from "axios";
import { v1 as uuid } from "uuid";
import { NonSensitivePatientData, Patient, PatientFormValues } from "../types";

// import toNewPatientEntry from "../utils";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
    const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

    return data;
};

const getNonSensitivePatientData = async () => {
    const { data } = await axios.get<NonSensitivePatientData[]>(
        `${apiBaseUrl}/patients`
    );

    return data;
};

const create = async (object: PatientFormValues) => {
    const newPatient = {
        id: uuid(),
        ...object,
    };
    // const newPatientEntry = toNewPatientEntry(newPatient);
    console.log("newpat", newPatient);
    try {
        console.log("hi");
        console.log(`${apiBaseUrl}/patients`);
        const response = await axios.post<Patient>(
            `${apiBaseUrl}/patients`,
            newPatient
        );
        console.log("dataaa", response);
        return newPatient;
    } catch (error) {
        throw new Error("error:" + error);
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    create,
    getNonSensitivePatientData,
};
