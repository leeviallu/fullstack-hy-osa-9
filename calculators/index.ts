import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";
const app = express();

app.use(express.json());

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

app.post("/exercises", (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const dailyExercises: number[] = req.body.daily_exercises;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const target: number = req.body.target;

        if (isNaN(target) || dailyExercises.constructor !== Array) {
            throw new Error("malformatted parameters");
        }
        dailyExercises.forEach((exercise) => {
            if (isNaN(exercise)) {
                throw new Error("malformatted parameters");
            }
        });
        const calculatedExercises = calculateExercises(target, dailyExercises);
        res.json({
            calculatedExercises,
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

const PORT = 3004;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
