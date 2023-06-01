import { CoursePart } from "../types";

const Content = (course: CoursePart) => {
    return (
        <p>
            {course.name} {course.exerciseCount}
        </p>
    );
};

export default Content;
