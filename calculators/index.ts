import express from "express";
import calculateBmi from "./bmiCalculator";
const app = express();

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi?", (req, res) => {
    try {
        const height = Number(req.query.height);
        const weight = Number(req.query.weight);
        if (isNaN(height) || isNaN(weight) || weight === 0 || height === 0) {
            throw new Error("malformatted data");
        }
        const bmi = calculateBmi(height, weight);
        res.json({
            height,
            weight,
            bmi,
        });
    } catch (error: unknown) {
        let errorMessage = "Something went wrong: ";
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        res.status(400);
        res.json({
            error: errorMessage,
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
