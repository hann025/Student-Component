import React from "react";
import './Student.css';
import StudentModule from "./StudentModule";
import StudentForm from "./StudentForm";
import axios from 'axios';

const Student = ({ config }) => {
  const headerName = 'Students';

  const [studentData, setStudentData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [showStudentForm, setShowStudentForm] = React.useState(false);

  React.useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/students', config);
        setStudentData(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [config]);

  const handleAddStudent = async (newStudent) => {
    try {
      const response = await axios.post('http://localhost:3000/students', newStudent, config);
      setStudentData((prevData) => [...prevData, response.data.data]);
      setShowStudentForm(false);
    } catch (err) {
      alert('Failed to add student: ' + err.message);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`http://localhost:3000/students/${studentId}`, config);
      setStudentData((prevData) => prevData.filter((student) => student.student_id !== studentId));
    } catch (err) {
      alert('Failed to delete student: ' + err.message);
    }
  };

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error fetching students: {error}</p>;

  return (
    <div className="student-content">
      <div className="header-student">
        <h2>{headerName}</h2>
        <p>Manage Student Records</p>
      </div>
      <button
        className="assignstudentbutton"
        onClick={() => setShowStudentForm(true)}
      >
        Add Student
      </button>

      <div className="student-main">
        <div className="student-header">
          <p>Student ID</p>
          <p>Student Name</p>
          <p>Action</p>
        </div>
        {studentData.length > 0 ? (
          studentData.map((student) => (
            <StudentModule
              key={student.student_id}
              student={student}
              onDelete={handleDeleteStudent}
            />
          ))
        ) : (
          <p>No students found.</p>
        )}
      </div>

      {showStudentForm && (
        <StudentForm
          onAddStudent={handleAddStudent}
          onClose={() => setShowStudentForm(false)}
        />
      )}
    </div>
  );
};

export default Student;
