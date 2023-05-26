interface BmiValues {
    value1: number;
    value2: number;
}
type Operation = "bmi" | "exercise";

const parseArguments = (args: string[], op: Operation): BmiValues => {
    if (op === "bmi") {
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
    }
};

export default parseArguments;
