import React, { useState } from "react";
import "../styles/BookModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes, faBars, faCheck, faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import copy from 'clipboard-copy';

const BookModal = ({ closeModal, selectedBookId, selectedBook, studentsss }) => {
    const [isEditEnabled, setIsEditEnabled] = useState(false);
    const [editedFieldIndex, setEditedFieldIndex] = useState(null);
    const [isStudentListClicked, setStudentListClicked] = useState(false);

    const handleEditClick = (index) => {
        setEditedFieldIndex(index);
        setIsEditEnabled(true);
    };

    const handleTickClick = () => {
        setIsEditEnabled(false);
        // Implement here the functionality to save the updated student values in altas
    };

    const handleStudentListClick = () => {
        setStudentListClicked(true);
    }

    const restoreEditDetails = () => {
        setStudentListClicked(false);
    }

    const handleCopyClick = () => {
        const studentId = document.querySelector('.book_id_copy');
        
        if (studentId) {
          copy(studentId.textContent);
        }
      };

    return (
        <>
            <div className="modal-wrapper"></div>

            <div className="modal-container">
                <div className="col-1-of-2 BookModal__infobookDetails">

                    <button className="modal_btn_close" onClick={closeModal}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>

                    <div className="book-profile">
                        <img
                            className="book-image"
                            src={selectedBook.image}
                            alt="User"
                        />
                        <div>
                            <h2 className="modal_title">{selectedBook.title}</h2>
                            <h4>{selectedBook.author}</h4>
                        </div>

                    </div>

                    <div className="details-container">
                        <p>{selectedBook.description}</p>

                        <p className="bookId">BookID:<span className="book_id_copy"><strong>{selectedBook.book_id}</strong></span>&nbsp;&nbsp;<abbr title="Copy to Clipboard"><span className="copyId" onClick={handleCopyClick}><FontAwesomeIcon icon={faCopy} /></span></abbr></p>
                        <div className="stats currentRecords">
                            <label>Qunatity:</label>
                            <span>{selectedBook.quantity}</span>
                            <label>Copies Issued:</label>
                            <span>{selectedBook.copies_issued}</span>


                        </div>

                        <button onClick={handleStudentListClick}>Student List &nbsp;&rarr;</button>
                    </div>

                </div>
                <div className="col-1-of-2 BookModal__editDetails">
                    {isStudentListClicked ? (
                        <div>
                            <h2>Students:</h2>
                            <div className="BookModal__StudentList">
                                {studentsss.map(student => (
                                    <div className="bookModal__studentCards">
                                        <img className="bookModal__studentImg" src={student.profilePicture} alt="" />
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
                                            isEditEnabled && editedFieldIndex === 0 ? "editable-field" : "nonEditable-field"
                                        }
                                    />
                                    {isEditEnabled && editedFieldIndex === 0 ? (
                                        <span className="edit-icon" onClick={handleTickClick}>
                                            <FontAwesomeIcon icon={faCheck} />
                                            <span className="tooltip">Save</span>
                                        </span>
                                    ) : (
                                        <span className="edit-icon" onClick={() => handleEditClick(0)}>
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
                                            isEditEnabled && editedFieldIndex === 1 ? "editable-field" : "nonEditable-field"
                                        }
                                    />
                                    {isEditEnabled && editedFieldIndex === 1 ? (
                                        <span className="edit-icon" onClick={handleTickClick}>
                                            <FontAwesomeIcon icon={faCheck} />
                                            <span className="tooltip">Save</span>
                                        </span>
                                    ) : (
                                        <span className="edit-icon" onClick={() => handleEditClick(1)}>
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
                                            isEditEnabled && editedFieldIndex === 2 ? "editable-field" : "nonEditable-field"
                                        }
                                    />
                                    {isEditEnabled && editedFieldIndex === 2 ? (
                                        <span className="edit-icon" onClick={handleTickClick}>
                                            <FontAwesomeIcon icon={faCheck} />
                                            <span className="tooltip">Save</span>
                                        </span>
                                    ) : (
                                        <span className="edit-icon" onClick={() => handleEditClick(2)}>
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
                                            isEditEnabled && editedFieldIndex === 3 ? "editable-field" : "nonEditable-field"
                                        }
                                    />
                                    {isEditEnabled && editedFieldIndex === 3 ? (
                                        <span className="edit-icon" onClick={handleTickClick}>
                                            <FontAwesomeIcon icon={faCheck} />
                                            <span className="tooltip">Save</span>
                                        </span>
                                    ) : (
                                        <span className="edit-icon" onClick={() => handleEditClick(3)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                            <span className="tooltip">Edit</span>
                                        </span>
                                    )}
                                </div>

                                <div className="input-container">
                                    <label className="labels">Description:</label>
                                    <br />
                                    <textarea
                                        // type="text"
                                        defaultValue={selectedBook.description}
                                        disabled={!isEditEnabled || editedFieldIndex !== 4}
                                        className={
                                            isEditEnabled && editedFieldIndex === 4 ? "editable-field textareaDescE" : "nonEditable-field textareaDesc"
                                        }
                                        cols={40}
                                    />
                                    {isEditEnabled && editedFieldIndex === 4 ? (
                                        <span className="edit-icon" onClick={handleTickClick}>
                                            <FontAwesomeIcon icon={faCheck} />
                                            <span className="tooltip">Save</span>
                                        </span>
                                    ) : (
                                        <span className="edit-icon" onClick={() => handleEditClick(4)}>
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
        </>
    );
};

export default BookModal;
