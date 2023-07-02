import React, { useState, useEffect } from "react";
import "../styles/BookModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTimes,
  faCheck,
  faCopy,
  faTrash,
  faCheckCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import copy from "clipboard-copy";

const BookModal = ({
  closeModal,
  selectedBookId,
  selectedBook,
  studentsss,
  students
}) => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [editedFieldIndex, setEditedFieldIndex] = useState(null);
  const [isStudentListClicked, setStudentListClicked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [progressBarVisible, setProgressBarVisible] = useState(false);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [isBookListVisible, setBookListVisible] = useState(true);

  const handleEditClick = (index) => {
    setEditedFieldIndex(index);
    setIsEditEnabled(true);
  };

  const handleTickClick = () => {
    setIsEditEnabled(false);
    // Implement here the functionality to save the updated student values in altas
  };

  const handleStudentListClick = () => {
    setStudentListClicked(!isStudentListClicked);
  };

  const handleAddStudent = () => {
    setIsAddingStudent(!isAddingStudent);
    setStudentName("");
    setBookListVisible(true);
  };

  const handleAssign = () => {

  }

  const handleCancel = () => {
    setIsAddingStudent(false);
    setStudentName("");
    setBookListVisible(false);
  };

  const studentListButtonText = isStudentListClicked
    ? "Edit Details"
    : "Student List";
  const studentListButtonStyle = {
    color: isStudentListClicked ? "#000" : "#fff",
    backgroundColor: isStudentListClicked ? "lightgreen" : "#2196f3",
  };

  const handleCopyClick = () => {
    const studentId = document.querySelector(".book_id_copy");
    if (studentId) {
      copy(studentId.textContent);
    }
    setShowAlert(true);
  };

  useEffect(() => {
    let progressBarTimeout;
    if (showAlert) {
      setProgressBarVisible(true);
      progressBarTimeout = setTimeout(() => {
        setProgressBarVisible(false);
        setShowAlert(false);
      }, 3000);
    }
    return () => {
      clearTimeout(progressBarTimeout);
    };
  }, [showAlert]);

  return (
    <>
      <div className="modal-wrapper"></div>

      <div className="modal-container">
        <div className="col-1-of-2 BookModal__infobookDetails">
          <button className="modal_btn_close" onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <div className="book-profile">
            <img className="book-image" src={selectedBook.image} alt="User" />
            <div>
              <h2 className="modal_title">{selectedBook.title}</h2>
              <h4>{selectedBook.author}</h4>
            </div>
          </div>

          <div className="details-container">
            <p>{selectedBook.description}</p>

            <p className="bookId">
              BookID:
              <span className="book_id_copy">
                <strong>{selectedBook.book_id}</strong>
              </span>
              &nbsp;&nbsp;
              <abbr title="Copy to Clipboard">
                <span className="copyId" onClick={handleCopyClick}>
                  <FontAwesomeIcon icon={faCopy} />
                </span>
              </abbr>
            </p>
            <div className="stats currentRecords">
              <label>Qunatity:</label>
              <span>{selectedBook.quantity}</span>
              <label>Copies Issued:</label>
              <span>{selectedBook.copies_issued}</span>
            </div>

            <button
              onClick={handleStudentListClick}
              style={studentListButtonStyle}
            >
              {studentListButtonText} &nbsp;&rarr;
            </button>
          </div>
        </div>
        <div className="col-1-of-2 BookModal__editDetails">
          {isStudentListClicked ? (
            <div>
              {!isAddingStudent && (
                <div className="isStudentNotClicked">
                  <h3>Students:</h3>
                  <button
                    className="bookModal___addStudent"
                    onClick={handleAddStudent}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              )}

              {isAddingStudent ? (
                
                <div className="bookModal_EntireStudentList">
                  <h3>Assign Book</h3>
                  <input
                    type="text"
                    placeholder="Enter student name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                  <div className="issueBook__btns">
                    <button onClick={handleAssign}>Assign</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                  <div className="BookModal__StudentList Modal_StudenList">

                    <p>OR pick a student manually:</p>
                    {students.map((stud) => (
                      <div onClick={() => changeInputValue(stud)} className="bookModal__studentCards modal_BookCards">
                        <img
                          className="bookModal__studentImg bookModal_round modal__bookImg"
                          src={stud.profilePicture}
                          alt=""
                        />
                        <div>
                          <h4>{stud.name}</h4>
                          <p>{stud.id}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


              ) : (
                <div className="BookModal__StudentList">
                  {studentsss.map((student) => (
                    <div className="bookModal__studentCards">
                      <img
                        className="bookModal__studentImg"
                        src={student.profilePicture}
                        alt=""
                      />
                      <div>
                        <h4>{student.name}</h4>
                        <p>{student.id}</p>
                      </div>
                      <button className="delete-icon">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          ) : (
            <>
              <div className="editBookInfo">
                <h3>Edit book details:</h3>
                <div className="line"></div>
                <div className="input-container">
                  <label className="labels">Book Name:</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={selectedBook.title}
                    disabled={!isEditEnabled || editedFieldIndex !== 0}
                    className={
                      isEditEnabled && editedFieldIndex === 0
                        ? "editable-field"
                        : "nonEditable-field"
                    }
                  />
                  {isEditEnabled && editedFieldIndex === 0 ? (
                    <span className="edit-icon" onClick={handleTickClick}>
                      <FontAwesomeIcon icon={faCheck} />
                      <span className="tooltip">Save</span>
                    </span>
                  ) : (
                    <span
                      className="edit-icon"
                      onClick={() => handleEditClick(0)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      <span className="tooltip">Edit</span>
                    </span>
                  )}
                </div>

                <div className="input-container">
                  <label className="labels">Book ID:</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={selectedBook.book_id}
                    disabled={!isEditEnabled || editedFieldIndex !== 1}
                    className={
                      isEditEnabled && editedFieldIndex === 1
                        ? "editable-field"
                        : "nonEditable-field"
                    }
                  />
                  {isEditEnabled && editedFieldIndex === 1 ? (
                    <span className="edit-icon" onClick={handleTickClick}>
                      <FontAwesomeIcon icon={faCheck} />
                      <span className="tooltip">Save</span>
                    </span>
                  ) : (
                    <span
                      className="edit-icon"
                      onClick={() => handleEditClick(1)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      <span className="tooltip">Edit</span>
                    </span>
                  )}
                </div>

                <div className="input-container">
                  <label className="labels">Author:</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={selectedBook.author}
                    disabled={!isEditEnabled || editedFieldIndex !== 2}
                    className={
                      isEditEnabled && editedFieldIndex === 2
                        ? "editable-field"
                        : "nonEditable-field"
                    }
                  />
                  {isEditEnabled && editedFieldIndex === 2 ? (
                    <span className="edit-icon" onClick={handleTickClick}>
                      <FontAwesomeIcon icon={faCheck} />
                      <span className="tooltip">Save</span>
                    </span>
                  ) : (
                    <span
                      className="edit-icon"
                      onClick={() => handleEditClick(2)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      <span className="tooltip">Edit</span>
                    </span>
                  )}
                </div>

                <div className="input-container">
                  <label className="labels">Image URL:</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={selectedBook.image}
                    disabled={!isEditEnabled || editedFieldIndex !== 3}
                    className={
                      isEditEnabled && editedFieldIndex === 3
                        ? "editable-field"
                        : "nonEditable-field"
                    }
                  />
                  {isEditEnabled && editedFieldIndex === 3 ? (
                    <span className="edit-icon" onClick={handleTickClick}>
                      <FontAwesomeIcon icon={faCheck} />
                      <span className="tooltip">Save</span>
                    </span>
                  ) : (
                    <span
                      className="edit-icon"
                      onClick={() => handleEditClick(3)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      <span className="tooltip">Edit</span>
                    </span>
                  )}
                </div>

                <div className="input-container">
                  <label className="labels">Description:</label>
                  <br />
                  <textarea
                    defaultValue={selectedBook.description}
                    disabled={!isEditEnabled || editedFieldIndex !== 4}
                    className={
                      isEditEnabled && editedFieldIndex === 4
                        ? "editable-field textareaDescE"
                        : "nonEditable-field textareaDesc"
                    }
                    cols={40}
                  />
                  {isEditEnabled && editedFieldIndex === 4 ? (
                    <span className="edit-icon" onClick={handleTickClick}>
                      <FontAwesomeIcon icon={faCheck} />
                      <span className="tooltip">Save</span>
                    </span>
                  ) : (
                    <span
                      className="edit-icon"
                      onClick={() => handleEditClick(4)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      <span className="tooltip">Edit</span>
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {showAlert && (
        <div className="alert-box">
          <FontAwesomeIcon icon={faCheckCircle} className="alert-icon" />
          <span className="alert-message">
            {" "}
            &nbsp;&nbsp;Book ID copied to clipboard
          </span>
          {progressBarVisible && <div className="progress-bar"></div>}
        </div>
      )}
    </>
  );
};

export default BookModal;
