import axios from "axios";
import { v1 as uuid } from "uuid";
import { NonSensitivePatientData, Patient, PatientFormValues } from "../types";

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
    try {
        await axios.post<Patient>(`${apiBaseUrl}/patients`, newPatient);
    } catch (error) {
        console.error(error);
    }
    return newPatient;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    create,
    getNonSensitivePatientData,
};
