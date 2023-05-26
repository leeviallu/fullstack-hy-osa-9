import { parseBmiArguments } from "./utils";

const calculateBmi = (height: number, weight: number): String => {
    const heightAsMeters = height / 100;
    const bmi = weight / (heightAsMeters * heightAsMeters);
    if (bmi < 16) {
        return "Underweight (Severe thinness)";
    }
    if (bmi < 17) {
        return "Underweight (Moderate thinness)";
    }
    if (bmi < 18.5) {
        return "Underweight (Mild thinness)";
    }
    if (bmi < 25) {
        return "Normal (healthy weight)";
    }
    if (bmi < 30) {
        return "Overweight (Pre-obese)";
    }
    if (bmi < 35) {
        return "Obese (Class I)";
    }
    if (bmi < 40) {
        return "Obese (Class II)";
    }
    return "Obese (Class III)";
};

export default calculateBmi;

try {
    const { value1, value2 } = parseBmiArguments(process.argv);
    console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}
