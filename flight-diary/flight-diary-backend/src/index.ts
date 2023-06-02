import express from "express";
const app = express();
import diaryRouter from "./routes/diaries";
import cors from "cors";

const PORT = 3000;

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get("/ping", (_req, res) => {
    console.log("someone pinged here");
    res.send("pong");
});

app.use("/api/diaries", diaryRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
