import React, { useState } from "react";
import "../styles/BookModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes, faBars, faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";

const BookModal = ({ closeModal, selectedBookId, selectedBook }) => {
    const [isEditEnabled, setIsEditEnabled] = useState(false);
    const [editedFieldIndex, setEditedFieldIndex] = useState(null);

    const handleEditClick = (index) => {
        setEditedFieldIndex(index);
        setIsEditEnabled(true);
    };

    const handleTickClick = () => {
        setIsEditEnabled(false);
        // Implement here the functionality to save the updated student values in altas
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
                        <p className="bookId">BookID:<strong>{selectedBook.book_id}</strong>&nbsp;&nbsp;<abbr title="Copy to Clipboard"><span className="copyId"><FontAwesomeIcon icon={faCopy} /></span></abbr></p>
                        <div className="stats currentRecords"> 
                        <label>Quantity:</label>
                        <span>{selectedBook.quantity}</span>
                        <label>Copies Issued:</label>
                        <span>{selectedBook.copies_issued}</span>
                        </div>
                    </div>


                </div>
                <div className="col-1-of-2 BookModal__editDetails">
                    <div className="editBookInfo">



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
                </div>
            </div>
        </>
    );
};

export default BookModal;
