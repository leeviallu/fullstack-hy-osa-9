import axios from "axios";

const getAll = async () => {
    const { data } = await axios.get("http://localhost:3000/api/diaries");
    return data;
};

export default {
    getAll,
};
