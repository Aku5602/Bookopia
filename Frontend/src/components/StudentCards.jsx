import React, { useState,useContext } from 'react';
// import { Link } from "react-router-dom";
import Modal from './Modal'
import books from "../data/Books.jsx";
import BooksInventory from "../data/BooksInventory.jsx";
import StudentData from '../api/StudentDataApi';
import { DeleteContext } from "../pages/Students";

const StudentCards = ({ student }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const deleteUpdate= useContext(DeleteContext);

  const handleUpdateClick = () => {
    setSelectedStudentId(student.id);
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleDelete = (oldStudentID) => {
    StudentData.deleteStudentData(oldStudentID).then((res)=>{deleteUpdate()});  
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="student-card" >
        <img src={student.profilePicture} alt="User" />
        <div className="student-details">
          <h3>{student.name}</h3>
          <p> <strong>{student.email}</strong></p>
          <p>PRN: {student.id}</p>
          <p>Mobile: {student.mobile}</p>
          <div className="buttons">
            <button onClick={handleUpdateClick}>Update</button>
            <button className='btn_DEL' onClick={() => handleDelete(student.id)}>Delete</button>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal  closeModal={closeModal} selectedStudentId={selectedStudentId} selectedStudent={...selectedStudent} books={books} BooksInventory={BooksInventory}>

        </Modal>
      )}

    </>
  )
}

export default StudentCards;