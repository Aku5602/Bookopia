import React from "react";
import "../styles/Modal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ closeModal, selectedStudentId, selectedStudent, books  }) => {
    return <>
        <div className="modal-wrapper"></div>

        <div className="modal-container">
                <div className="col-1-of-2 editDetails">
                    <button className="modal_btn_close" onClick={closeModal}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <div className="profile-container">
                        <img className="profile-picture" src={selectedStudent.profilePicture} alt="User" />
                        <h2 className="modal_title">{selectedStudent.name}</h2>
                    </div>
                    <div className="details-container">
                        <div className="input-container">
                            <label className="labels">Email:</label><br />
                            <input type="text" defaultValue={selectedStudent.email} />
                            <span className="edit-icon"><FontAwesomeIcon icon={faEdit} /></span>
                        </div>
                        <div className="input-container">
                            <label className="labels">PRN:</label><br />
                            <input type="text" defaultValue={selectedStudent.id} />
                            <span className="edit-icon"><FontAwesomeIcon icon={faEdit} /></span>
                        </div>
                        <div className="input-container">
                            <label className="labels">Contact Number:</label><br />
                            <input type="text" defaultValue={selectedStudent.mobile} />
                            <span className="edit-icon"><FontAwesomeIcon icon={faEdit} /></span>
                        </div>
                    </div>
                </div>
                <div className="col-1-of-2 bookDetails">
                <h3>Books:</h3>
          <div className="book-carousel">
            {books.map(book => (
              <div key={book.id} className="book-item">
                <img src={book.image} alt={book.title} />
                <h4>{book.title}</h4>
                <p>Author: {book.author}</p>
                <p>ID: {book.book_id}</p>
                <br />
                <p>Date of Issue: 24 Jun 2023</p>
                <span className={`bookStatus ${book.status === 'Issued' ? 'issued' : 'returned'}`}>{book.status}</span>
                <p></p>
              </div>
            ))}
          </div>
                </div>

        </div> {/* Model container div ending */}



    </>;
};

export default Modal;