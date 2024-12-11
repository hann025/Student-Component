import React from "react";

const StudentModule = ({ student, onDelete }) => {
  return (
    <div className="student-row">
      <p>{student.student_id}</p>
      <p>{student.student_name}</p>
      <button onClick={() => onDelete(student.student_id)}>Delete</button>
    </div>
  );
};

export default StudentModule;
