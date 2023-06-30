import React, { useState } from "react";
import "../styles/Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes, faBars, faCheck } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ closeModal, selectedStudentId, selectedStudent, books }) => {
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [isEditEnabled, setIsEditEnabled] = useState(false);
    const [editedFieldIndex, setEditedFieldIndex] = useState(null);
    const [isAddBookClicked, setIsAddBookClicked] = useState(false);

    const handleMenuToggle = (bookId) => {
        if (selectedBookId === bookId) {
            setSelectedBookId(null);
        } else {
            setSelectedBookId(bookId);
        }
    }; 

    const handleEditClick = (index) => {
        setEditedFieldIndex(index);
        setIsEditEnabled(true);
    };

    const handleTickClick = () => {
        setIsEditEnabled(false);
        // Implement here the functionality to save the updated student values in altas
        
    };

    const handleAddBookClick = () => {
        setIsAddBookClicked(true);
      };

      const closeAddBook = () => {
        setIsAddBookClicked(false);
      }

    return (
        <>
            <div className="modal-wrapper"></div>

            <div className="modal-container">
                <div className="col-1-of-2 editDetails">
                    <button className="modal_btn_close" onClick={closeModal}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <div className="profile-container">
                        <img
                            className="profile-picture"
                            src={selectedStudent.profilePicture}
                            alt="User"
                        />
                        <h2 className="modal_title">{selectedStudent.name}</h2>
                    </div>

                    <div className="details-container">
                        <div className="input-container">
                            <label className="labels">Email:</label>
                            <br />

                            <input
                                type="text"
                                defaultValue={selectedStudent.email}
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
                            <label className="labels">PRN:</label>
                            <br />
                            <input
                                type="text"
                                defaultValue={selectedStudent.id}
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
                            <label className="labels">Contact Number:</label>
                            <br />
                            <input
                                type="text"
                                defaultValue={selectedStudent.mobile}
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

                            <div className="stats">
                                <div className="fines">
                                    <span className="fineToBePaid">
                                        Fine: ₹ <span>350</span>/-
                                    </span>
                                    <span className="finePaid">
                                        Paid Fine: ₹ <span>0</span>/-
                                    </span>
                                </div>

                                <div className="booksIssued">
                                    <span>
                                        Books issued: <span>5</span>
                                    </span>
                                    <span>
                                        Total books issued: <span>10</span>
                                    </span>
                                </div>
                                <span>
                                    Member since: <span>09 Feb 23</span>
                                </span>
                                <button onClick={handleAddBookClick}>Add a Book</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-1-of-2 bookDetails">
                    {isAddBookClicked && ( 
                        <div className="issueBook">
                            <input type="text" placeholder="Enter BookID" />
                            <button>Issue Book</button>
                            <button onClick={closeAddBook}>Cancel</button>
                        </div>
                    )}
                    <h3>Books:</h3>
                    <div className="Modal__book-carousel">
                        {books.map((book) => (
                            <div key={book.id} className="book-item">
                                <button
                                    className={`menu-icon ${selectedBookId === book.id ? "active" : ""
                                        }`}
                                    onClick={() => handleMenuToggle(book.id)}
                                >
                                    <FontAwesomeIcon icon={faBars} />
                                    {selectedBookId === book.id && (
                                        <span className="arrow"></span>
                                    )}
                                </button>
                                {selectedBookId === book.id && (
                                    <ul className={`menu-options`}>
                                        <li>
                                            <a className="opt1" href="">
                                                Mark as Returned
                                            </a>
                                        </li>
                                        <li>
                                            <a className="opt2" href="">
                                                Renew
                                            </a>
                                        </li>
                                        <li>
                                            <a className="opt3" href="">
                                                Remove Book
                                            </a>
                                        </li>
                                        <li>
                                            <a className="opt4" href="">
                                                Lost/Damaged
                                            </a>
                                        </li>
                                    </ul>
                                )}

                                <img src={book.image} alt={book.title} />
                                <h4>{book.title}</h4>
                                <p>Author: {book.author}</p>
                                <p>ID: {book.book_id}</p>
                                <br />
                                <p>Date of Issue: 24 Jun 2023</p>
                                <span
                                    className={`bookStatus ${book.status === "Issued" ? "issued" : "returned"
                                        }`}
                                >
                                    {book.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
