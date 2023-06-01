import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
import { CoursePart } from "./types";

const App = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
        },
    ];
    const allExercisesCount = courseParts.reduce(
        (carry, part) => carry + part.exerciseCount,
        0
    );

    return (
        <div>
            <Header name={courseName} />
            <Content courses={courseParts} />
            <Total allExercisesCount={allExercisesCount} />
        </div>
    );
};

export default App;
