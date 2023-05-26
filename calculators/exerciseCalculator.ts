const calculateExercises = (exerciseHours: number[], targetValue: number) => {
    const periodLength = exerciseHours.length;
    const trainingDays = (): number => {
        let trainingDays = 0;
        exerciseHours.forEach((day) => {
            if (day > 0) {
                trainingDays += 1;
            }
        });
        return trainingDays;
    };
    const target = targetValue;
    const average = (): number => {
        const days = periodLength;
        let hours = 0;
        exerciseHours.forEach((day) => {
            hours += day;
        });
        return hours / days;
    };

    let ratingDescription = "";
    const rating = (): number => {
        let hours = 0;
        exerciseHours.forEach((day) => {
            hours += day;
        });
        if (hours < targetValue * 7 * 0.5) {
            ratingDescription = "could be better";
            return 1;
        }
        if (hours < targetValue * 7) {
            ratingDescription = "not too bad but could be better";
            return 2;
        } else {
            ratingDescription = "good result";
            return 3;
        }
    };

    const success: boolean = targetValue <= average() ? true : false;

    const result = {
        periodLength,
        trainingDays: trainingDays(),
        success,
        rating: rating(),
        ratingDescription,
        target,
        average: average(),
    };
    return result;
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
