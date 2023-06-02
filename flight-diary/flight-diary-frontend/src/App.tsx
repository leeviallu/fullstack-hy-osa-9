import { useEffect, useState } from "react";
import { getAllDiaries, createDiary } from "./services/diaries";

const App = () => {
    interface Diary {
        date: string;
        id: number;
        visibility: string;
        weather: string;
        comment?: string;
    }

    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [newVisibility, setNewVisibility] = useState("");
    const [newWeather, setNewWeather] = useState("");
    const [newComment, setNewComment] = useState("");
    const [newDate, setNewDate] = useState("");
    useEffect(() => {
        getAllDiaries().then((data) => {
            setDiaries(data);
        });
    }, []);

    const diaryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        createDiary({
            date: newDate,
            visibility: newVisibility,
            weather: newWeather,
            comment: newComment,
        });

        setNewDate("");
        setNewVisibility("");
        setNewWeather("");
        setNewComment("");
    };
    return (
        <div>
            <h1>Add new entry</h1>
            <form onSubmit={diaryCreation}>
                <input
                    placeholder="date"
                    value={newDate}
                    onChange={(event) => setNewDate(event.target.value)}
                />
                <br />
                <input
                    placeholder="visibility"
                    value={newVisibility}
                    onChange={(event) => setNewVisibility(event.target.value)}
                />
                <br />
                <input
                    placeholder="weather"
                    value={newWeather}
                    onChange={(event) => setNewWeather(event.target.value)}
                />
                <br />
                <input
                    placeholder="comment"
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                />
                <br />
                <button type="submit">add</button>
            </form>
            <h1>Diary entries</h1>
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
