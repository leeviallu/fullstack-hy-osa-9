import { CoursePart } from "../types";

const Content = ({ courses }: { courses: CoursePart[] }) => {
    return (
        <div>
            {courses.map((course, idx) => (
                <p key={idx}>
                    {course.name} {course.exerciseCount}
                </p>
            ))}
        </div>
    );
};

export default Content;
