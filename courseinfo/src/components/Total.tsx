import { CoursePart } from "../types";

const Total = ({ courses }: { courses: CoursePart[] }) => {
    return (
        <p>
            Number of exercises{" "}
            {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    );
};

export default Total;
