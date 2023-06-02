import { useEffect, useState } from "react";
import diariesService from "./services/diaries";

const App = () => {
    interface Diaries {
        date: string;
        id: number;
        visibility: string;
        weather: string;
        comment: string;
    }

    const [diaries, setDiaries] = useState<Diaries[]>([]);
    useEffect(() => {
        const fetchdata = async () => {
            const data = await diariesService.getAll();
            setDiaries(data);
        };
        fetchdata();
    }, []);
    return (
        <div>
            {diaries.map((diary) => {
                return (
                    <div key={diary.id}>
                        <h2>{diary.date}</h2>
                        <p>visibility: {diary.visibility}</p>
                        <p>weather: {diary.weather}</p>
                        <p>comment: {diary.comment}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default App;
