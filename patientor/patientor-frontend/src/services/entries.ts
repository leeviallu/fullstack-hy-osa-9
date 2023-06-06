import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Entry } from "../types";

const create = async (object: Omit<Entry, "id">, id: string | undefined) => {
    if (id === undefined) {
        throw new Error("Can't post entry without id");
    }
    try {
        const { data } = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id}/entries`,
            object
        );
        return data;
    } catch (error) {
        throw new Error("error:" + error);
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    create,
};
