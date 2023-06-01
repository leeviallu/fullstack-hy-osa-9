import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
import { CoursePart } from "./types";
import { Key } from "react";

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
            {courseParts.map(
                (course: CoursePart, idx: Key | null | undefined) => (
                    <Content
                        key={idx}
                        name={course.name}
                        exerciseCount={course.exerciseCount}
                    />
                )
            )}
            <Total allExercisesCount={allExercisesCount} />
        </div>
    );
};

export default App;
