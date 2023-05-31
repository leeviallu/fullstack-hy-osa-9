import axios from "axios";
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
    try {
        const { data } = await axios.post<Patient>(
            `${apiBaseUrl}/patients`,
            object
        );
        return data;
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
