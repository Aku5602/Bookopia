import React from 'react'
import {Link} from "react-router-dom";

const StudentCards = ({student}) => {
  const handleUpdate = (studentId) => {
    // Write the Update button event here
    //Navigate to /Student/BookInfo
  };

  const handleDelete = (studentId) => {
    // Write the Delete logic here
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
              <button onClick={() => handleUpdate(student.id)}>Update</button>
              <button className='btn_DEL' onClick={() => handleDelete(student.id)}>Delete</button>
            </div>
          </div>
        </div>
    </>
  )
}

export default StudentCards