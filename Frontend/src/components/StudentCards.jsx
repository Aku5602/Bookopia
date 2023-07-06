import React, { useState, useContext,useEffect } from "react";
import StudentModal from "./StudentModal";
import StudentData from "../api/StudentDataApi";
import { UpdateContext } from "../routes/StudentsPage";
 
const StudentCards = ({ student }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const updateContext = useContext(UpdateContext);

  useEffect(()=>{
    if(selectedStudent && student.id === selectedStudent.id) {
      setSelectedStudent({...student});
    }
  },[student])

  const handleUpdateClick = () => {
    setSelectedStudentId(student.id);
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleDelete = (oldStudentID) => {
    StudentData.deleteStudentData(oldStudentID).then(() => {
      updateContext();
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="student-card">
        <img src={student.profilePicture} alt="User" />
        <div className="student-card__student-details">
          <h3>{student.name}</h3>
          <p>
            {" "}
            <strong>{student.email}</strong>
          </p>
          <p>PRN: {student.id}</p>
          <p>Mobile: {student.mobile}</p>
          <div className="student-card__buttons">
            <button onClick={handleUpdateClick}>Update</button>
            <button
              className="student-card__buttons--del"
              onClick={() => handleDelete(student.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <StudentModal
          closeModal={closeModal}
          selectedStudentId={selectedStudentId}
          selectedStudent={selectedStudent}
        ></StudentModal>
      )}
    </>
  );
};

export default StudentCards;
