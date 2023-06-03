import { useEffect, useState } from "react";
import { getAllDiaries, createDiary } from "./services/diaries";
interface Diary {
    date: string;
    id: number;
    visibility: string;
    weather: string;
    comment?: string;
}

const App = () => {
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [newVisibility, setNewVisibility] = useState("");
    const [newWeather, setNewWeather] = useState("");
    const [newComment, setNewComment] = useState("");
    const [newDate, setNewDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        getAllDiaries().then((data) => {
            setDiaries(data);
        });
    }, []);

    const diaryCreation = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const result = await createDiary({
            date: newDate,
            visibility: newVisibility,
            weather: newWeather,
            comment: newComment,
        });
        if (result) {
            if (
                typeof result.data === "string" ||
                result.data instanceof String
            ) {
                setErrorMessage(String(result.data));
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
            } else {
                setDiaries([...diaries, result.data]);
            }
        }
        setNewDate("");
        setNewVisibility("");
        setNewWeather("");
        setNewComment("");
    };
    return (
        <div>
            <h1>Add new entry</h1>
            {errorMessage ? (
                <p style={{ color: "red" }}>{errorMessage}</p>
            ) : null}
            <form onSubmit={diaryCreation}>
                date
                <input
                    type="date"
                    value={newDate}
                    onChange={(event) => setNewDate(event.target.value)}
                />
                <br />
                <div>
                    visibility&emsp;
                    <label htmlFor="great">great</label>
                    <input
                        type="radio"
                        name="visibility"
                        checked={newVisibility === "great"}
                        onChange={() => setNewVisibility("great")}
                    />
                    &emsp;
                    <label htmlFor="good">good</label>
                    <input
                        type="radio"
                        name="visibility"
                        checked={newVisibility === "good"}
                        onChange={() => setNewVisibility("good")}
                    />
                    &emsp;
                    <label htmlFor="ok">ok</label>
                    <input
                        type="radio"
                        name="visibility"
                        checked={newVisibility === "ok"}
                        onChange={() => setNewVisibility("ok")}
                    />
                    &emsp;
                    <label htmlFor="poor">poor</label>
                    <input
                        type="radio"
                        name="visibility"
                        checked={newVisibility === "poor"}
                        onChange={() => setNewVisibility("poor")}
                    />
                    &emsp;
                </div>
                <div>
                    weather&emsp;
                    <label htmlFor="sunny">sunny</label>
                    <input
                        type="radio"
                        name="weather"
                        checked={newWeather === "sunny"}
                        onChange={() => setNewWeather("sunny")}
                    />
                    &emsp;
                    <label htmlFor="rainy">rainy</label>
                    <input
                        type="radio"
                        name="weather"
                        checked={newWeather === "rainy"}
                        onChange={() => setNewWeather("rainy")}
                    />
                    &emsp;
                    <label htmlFor="cloudy">cloudy</label>
                    <input
                        type="radio"
                        name="weather"
                        checked={newWeather === "cloudy"}
                        onChange={() => setNewWeather("cloudy")}
                    />
                    &emsp;
                    <label htmlFor="stormy">stormy</label>
                    <input
                        type="radio"
                        name="weather"
                        checked={newWeather === "stormy"}
                        onChange={() => setNewWeather("stormy")}
                    />
                    &emsp;
                    <label htmlFor="windy">windy</label>
                    <input
                        type="radio"
                        name="weather"
                        checked={newWeather === "windy"}
                        onChange={() => setNewWeather("windy")}
                    />
                </div>
                comment
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
