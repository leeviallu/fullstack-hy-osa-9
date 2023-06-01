import { CoursePart } from "../types";

const Part = ({ course }: { course: CoursePart }) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    switch (course.kind) {
        case "basic":
            return (
                <div>
                    <b>
                        {course.name} {course.exerciseCount}
                    </b>
                    <br />
                    <i>{course.description}</i>
                </div>
            );
        case "group":
            return (
                <div>
                    <b>
                        {course.name} {course.exerciseCount}
                    </b>
                    <br />
                    project exercises {course.groupProjectCount}
                </div>
            );
        case "background":
            return (
                <div>
                    <b>
                        {course.name} {course.exerciseCount}
                    </b>
                    <br />
                    <i>{course.description}</i>
                    <br />
                    submit to {course.backgroundMaterial}
                </div>
            );
        case "special":
            return (
                <div>
                    <b>
                        {course.name} {course.exerciseCount}
                    </b>
                    <br />
                    <i>{course.description}</i>
                    <br />
                    required skills:{" "}
                    {course.requirements.map((requirement, idx) => {
                        if (course.requirements.length - 1 === idx) {
                            return <span key={idx}>{requirement}</span>;
                        }
                        return <span key={idx}>{requirement}, </span>;
                    })}
                </div>
            );
        default:
            return assertNever(course);
    }
};

export default Part;
