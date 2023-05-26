interface BmiValues {
    value1: number;
    value2: number;
}

export const parseBmiArguments = (args: string[]): BmiValues => {
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

interface ExerciseValues {
    value1: number;
    value2: number[];
}

export const parseExerciseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error("Not enough arguments");
    const array: number[] = [];
    const modifiedArgs: string[] = [...args];
    modifiedArgs.splice(0, 3);
    modifiedArgs.forEach((arg) => {
        array.push(Number(arg));
    });
    return {
        value1: Number(args[2]),
        value2: array,
    };
};
