import express from "express";
const app = express();

app.get("/api/ping", (_req, res) => {
    res.send("pong");
});

const PORT = 3005;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
