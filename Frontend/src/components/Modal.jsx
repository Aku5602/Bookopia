import React, { useContext,useEffect, useState } from "react";
import "../styles/Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTimes,
  faBars,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import StudentDataApi from "../api/StudentDataApi";
import BookDataApi from "../api/BookDataApi";
import { DeleteContext } from "../pages/Students";

const Modal = ({
  closeModal,
  selectedStudentId,
  selectedStudent
}) => {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [editedFieldIndex, setEditedFieldIndex] = useState(null);
  const [isAddBookClicked, setIsAddBookClicked] = useState(false);
  const [editDetails, setEditDetails] = useState(selectedStudent);
  const [bookID,setBookID] = useState('');
  const [bookListAvailable, setBookListAvailable] = useState([]);
  const [update,setUpdate] = useState(false);
  const deleteUpdate= useContext(DeleteContext);

  useEffect(()=>{
    BookDataApi.getBookDataAvailable(selectedStudent.id).then((res) => {
      setBookListAvailable([...res.data]);
    });
  },[update]) 

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

  const handleTickClick = (key) => {
    setIsEditEnabled(false);

    const obj = { _id: editDetails._id };
    if (
      editDetails[key].trim().toLowerCase() ===
      selectedStudent[key].trim().toLowerCase()
    ) {
      return 0;
    } else {
      obj["key"] = key;
      obj["value"] = editDetails[key];
      StudentDataApi.patchStudentData(obj);
    }
  };

  const handleAddBookClick = () => {
    setIsAddBookClicked(true);
  };

  const closeAddBook = () => {
    setIsAddBookClicked(false);
  };

  function changeInputValue(booky) {
    setBookID(booky.book_id);
  }

  function handleAddIssueBook() {
    const objBook =bookListAvailable.filter((item)=>item.book_id === bookID);
    if(!bookID.trim().length || !objBook.length || (bookID.trim().toLowerCase() !== objBook[0].book_id.trim().toLowerCase()) ) {
      // console.log("No such component")
      return 0;
    }
    if(selectedStudent.books_issued.length == 3) {
      //Add here your book issue limit has reached.
      alert("Your book issue limit has reached");
      return 0;
    }

    const obj = {'no':objBook[0].no,'book_id':objBook[0].book_id};
    obj._id=selectedStudent._id;
    obj.id = selectedStudent.id;
    obj.profilePicture = selectedStudent.profilePicture;
    obj.name = selectedStudent.name;
    obj.image = objBook[0].image;
    obj.title = objBook[0].title;
    obj.author = objBook[0].author;
    obj.dateOfIssue = new Date();
    StudentDataApi.patchStudentBookInfo(obj).then(()=>{
      deleteUpdate();
      setBookID('');
      setUpdate((oldvalue)=>!update);
      selectedStudent.books_issued.push(obj);
      setIsAddBookClicked(false);
    });

    
  }

  function handleBookReturn(bookID) {
    // console.log('Hello',selectedBookId);
    const obj = {};
    obj._id = selectedStudentId;
    obj.book_id = selectedBookId;
    console.log(obj);
    StudentDataApi.deleteStudentDataBookInfo(obj).then((res)=>{deleteUpdate(); setUpdate(!update); closeModal();});
  }

  return (
    <>
      <div className="modal-wrapper"></div>

      <div className="modal-container">
        <div className="col-1-of-2 editDetails">
          <button className="modal_btn_close" onClick={()=>{deleteUpdate();closeModal()}}>
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
              <label className="labels">Name:</label>
              <br />

              <input
                type="text"
                defaultValue={selectedStudent.name}
                disabled={!isEditEnabled || editedFieldIndex !== 3}
                className={
                  isEditEnabled && editedFieldIndex === 3
                    ? "editable-field"
                    : "nonEditable-field"
                }
                onChange={(e) => {
                  setEditDetails({ ...editDetails, name: e.target.value });
                }}
              />
              {isEditEnabled && editedFieldIndex === 3 ? (
                <span
                  className="edit-icon"
                  onClick={() => handleTickClick("name")}
                >
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
              <label className="labels">Email:</label>
              <br />

              <input
                type="text"
                defaultValue={selectedStudent.email}
                disabled={!isEditEnabled || editedFieldIndex !== 0}
                className={
                  isEditEnabled && editedFieldIndex === 0
                    ? "editable-field"
                    : "nonEditable-field"
                }
                onChange={(e) => {
                  setEditDetails({ ...editDetails, email: e.target.value });
                }}
              />
              {isEditEnabled && editedFieldIndex === 0 ? (
                <span
                  className="edit-icon"
                  onClick={() => handleTickClick("email")}
                >
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
                  isEditEnabled && editedFieldIndex === 1
                    ? "editable-field"
                    : "nonEditable-field"
                }
                onChange={(e) => {
                  setEditDetails({ ...editDetails, id: e.target.value });
                }}
              />
              {isEditEnabled && editedFieldIndex === 1 ? (
                <span
                  className="edit-icon"
                  onClick={() => handleTickClick("id")}
                >
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
                  isEditEnabled && editedFieldIndex === 2
                    ? "editable-field"
                    : "nonEditable-field"
                }
                onChange={(e) => {
                  setEditDetails({ ...editDetails, mobile: e.target.value });
                }}
              />
              {isEditEnabled && editedFieldIndex === 2 ? (
                <span
                  className="edit-icon"
                  onClick={() => handleTickClick("mobile")}
                >
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
          {isAddBookClicked ? (
            <div className="issueBook">
              <h2>Issue a new Book</h2>
              <input type="text" defaultValue={ bookID } placeholder="Enter BookID" onChange={(e)=>setBookID(e.target.value)} />
              <div className="issueBook__btns">
                <button onClick={handleAddIssueBook}>Issue Book</button>
                <button onClick={closeAddBook}>Cancel</button>
              </div>

              <div>
                <div className="BookModal__StudentList Modal_StudenList">
                  {bookListAvailable.map((booky) => (
                    <div onClick={()=>changeInputValue(booky)} className="bookModal__studentCards modal_BookCards">
                      <img
                        className="bookModal__studentImg modal__bookImg"
                        src={booky.image}
                        alt=""
                      />
                      <div>
                        <h4>{booky.title}</h4>
                        <p>{booky.book_id}</p>
                        {/* <span>{booky.quantity}</span> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <h3>Books:</h3>
              <div className="Modal__book-carousel">
                {selectedStudent.books_issued.map((book) => (
                  <div key={book.book_id} className="book-item">
                    <button
                      className={`menu-icon ${
                        selectedBookId === book.book_id ? "active" : ""
                      }`}
                      onClick={() => handleMenuToggle(book.book_id)}
                    >
                      <FontAwesomeIcon icon={faBars} />
                      {selectedBookId === book.book_id&& (
                        <span className="arrow"></span>
                      )}
                    </button>
                    {selectedBookId === book.book_id && (
                      <ul className={`menu-options ${selectedBookId === book.book_id ? 'open' : ''}`}>
                        <li>
                          <a className="opt1" onClick={() => handleBookReturn(book.book_id)}>
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
                    <p>{new Date(book.dateOfIssue).getDate() +' '+  (new Date(book.dateOfIssue).getMonth()+1)+' '+ new Date(book.dateOfIssue).getFullYear()}</p>
                    <span
                      className={`bookStatus ${
                        book.status === "Issued" ? "issued" : "returned"
                      }`}
                    >
                      {book.status}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
