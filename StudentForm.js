import React, { useState } from "react";

const StudentForm = ({ onAddStudent, onClose }) => {
  const [studentName, setStudentName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddStudent({ student_name: studentName });
  };

  return (
    <div className="student-form">
      <h3>Add New Student</h3>
      <form onSubmit={handleSubmit}>
        <label>Student Name:</label>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
        <div className="form-buttons">
          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
