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

interface BmiValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error("Not enough arguments");
    if (args.length > 4) throw new Error("Too many arguments");
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3]),
        };
    } else {
        throw new Error("Provided values were not numbers!");
    }
};

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}
