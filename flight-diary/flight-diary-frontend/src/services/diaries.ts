import axios from "axios";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = async () => {
    const { data } = await axios.get(baseUrl);
    return data;
};

export const createDiary = async (object: {
    date: string;
    visibility: string;
    weather: string;
    comment: string;
}) => {
    console.log(object);
    const { data } = await axios.post(baseUrl, object);
    return data;
};
