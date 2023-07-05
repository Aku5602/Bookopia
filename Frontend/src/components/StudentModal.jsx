import React, { useContext, useEffect, useState, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTimes,
  faBars,
  faCheck, 
} from "@fortawesome/free-solid-svg-icons";
import StudentDataApi from "../api/StudentDataApi";
import BookDataApi from "../api/BookDataApi";
import { UpdateContext } from "../routes/StudentsPage";

const Modal = ({ closeModal, selectedStudentId, selectedStudent }) => {
  const [editDetails, setEditDetails] = useState(selectedStudent);
  const updateContext = useContext(UpdateContext);

  useEffect(()=>{
    setEditDetails({...selectedStudent});
  },[selectedStudent]);

  const initialState = {
    selectedBookId: null,
    isEditEnabled: false,
    editedFieldIndex: null,
    isAddBookClicked: false,
    bookID: "",
    bookListAvailable: [],
    update: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case "setSelectedBookId":
        return { ...state, selectedBookId: action.payload };
      case "setIsEditEnabled":
        return { ...state, isEditEnabled: action.payload };
      case "setEditedFieldIndex":
        return { ...state, editedFieldIndex: action.payload };
      case "setIsAddBookClicked":
        return { ...state, isAddBookClicked: action.payload };
      case "setBookID":
        return { ...state, bookID: action.payload };
      case "setBookListAvailable":
        return { ...state, bookListAvailable: action.payload };
      case "setUpdate":
        return { ...state, update: action.payload };
      default:
        throw new Error();
    }
  }

  useEffect(() => {
    BookDataApi.getBookDataAvailable(selectedStudent.id).then((res) => {
      dispatch({ type: "setBookListAvailable", payload: [...res.data] });
    });
  }, [state.update]);

  const handleMenuToggle = (bookId) => {
    if (state.selectedBookId === bookId) {
      dispatch({ type: "setSelectedBookId", payload: null });
    } else {
      dispatch({ type: "setSelectedBookId", payload: bookId });
    }
  };

  const handleEditClick = (index) => {
    dispatch({ type: "setEditedFieldIndex", payload: index });
    dispatch({ type: "setIsEditEnabled", payload: true });
  };

  const handleTickClick = (key) => {
    dispatch({ type: "setIsEditEnabled", payload: false });

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
    dispatch({ type: "setIsAddBookClicked", payload: true });
  };

  const closeAddBook = () => {
    dispatch({ type: "setIsAddBookClicked", payload: false });
  };

  function changeInputValue(booky) {
    dispatch({ type: "setBookID", payload: booky.book_id });
  }

  function handleAddIssueBook() {
    const objBook = state.bookListAvailable.filter(
      (item) => item.book_id === state.bookID
    );
    if (
      !state.bookID.trim().length ||
      !objBook.length ||
      state.bookID.trim().toLowerCase() !==
      objBook[0].book_id.trim().toLowerCase()
    ) {
      return 0;
    }
    if (selectedStudent.books_issued.length == 3) {
      alert("Your book issue limit has reached");
      return 0;
    }

    const obj = { no: objBook[0].no, book_id: objBook[0].book_id };
    obj._id = selectedStudent._id;
    obj.id = selectedStudent.id;
    obj.profilePicture = selectedStudent.profilePicture;
    obj.name = selectedStudent.name;
    obj.image = objBook[0].image;
    obj.title = objBook[0].title;
    obj.author = objBook[0].author;
    obj.dateOfIssue = new Date();
    StudentDataApi.patchStudentBookInfo(obj).then(() => {
      updateContext();
      dispatch({ type: "setBookID", payload: "" });
      dispatch({ type: "setUpdate", payload: !state.update });
      // selectedStudent.books_issued.push(obj);
      dispatch({ type: "setIsAddBookClicked", payload: false });
    });
  }

  function handleBookReturn() {
    const obj = {};
    obj._id = selectedStudentId;
    obj.book_id = state.selectedBookId;
    StudentDataApi.deleteStudentDataBookInfo(obj).then((res) => {
      updateContext();
      dispatch({ type: "setUpdate", payload: !state.update });
      // closeModal();
    });
  }

  return (
    <>
      <div className="modal-wrapper"></div>
      <div className="studentModalContainer modal_content">
        <div className="col-1-of-2 studentModalContainer__editDetails">
          <button
            className="modal_btn_close"
            onClick={() => {
              updateContext();
              closeModal();
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="profile-container">
            <img
              className="profile-container__profile-picture"
              src={selectedStudent.profilePicture}
              alt="User"
            />
            <h2 className="profile-container__name">{selectedStudent.name}</h2>
          </div>

          <div className="details-container">
            <div className="input-container">
              <label className="labels">Name:</label>
              <br />

              <input
                type="text"
                defaultValue={selectedStudent.name}
                disabled={!state.isEditEnabled || state.editedFieldIndex !== 3}
                className={
                  state.isEditEnabled && state.editedFieldIndex === 3
                    ? ""
                    : "nonEditable-field"
                }
                onChange={(e) => {
                  setEditDetails({ ...editDetails, name: e.target.value });
                }}
              />
              {state.isEditEnabled && state.editedFieldIndex === 3 ? (
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
                disabled={!state.isEditEnabled || state.editedFieldIndex !== 0}
                className={
                  state.isEditEnabled && state.editedFieldIndex === 0
                    ? "editable-field"
                    : "nonEditable-field"
                }
                onChange={(e) => {
                  setEditDetails({ ...editDetails, email: e.target.value });
                }}
              />
              {state.isEditEnabled && state.editedFieldIndex === 0 ? (
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
                disabled={!state.isEditEnabled || state.editedFieldIndex !== 1}
                className={
                  state.isEditEnabled && state.editedFieldIndex === 1
                    ? "editable-field"
                    : "nonEditable-field"
                }
                onChange={(e) => {
                  setEditDetails({ ...editDetails, id: e.target.value });
                }}
              />
              {state.isEditEnabled && state.editedFieldIndex === 1 ? (
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
                disabled={!state.isEditEnabled || state.editedFieldIndex !== 2}
                className={
                  state.isEditEnabled && state.editedFieldIndex === 2
                    ? "editable-field"
                    : "nonEditable-field"
                }
                onChange={(e) => {
                  setEditDetails({ ...editDetails, mobile: e.target.value });
                }}
              />
              {state.isEditEnabled && state.editedFieldIndex === 2 ? (
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

        <div className="col-1-of-2 studentModalContainer__bookDetails">
          {state.isAddBookClicked ? (
            <div className="issueBook">
              <h2>Issue a new Book</h2>
              <input
                type="text"
                defaultValue={state.bookID}
                placeholder="Enter BookID"
                onChange={(e) =>
                  dispatch({ type: "setBookID", payload: e.target.value })
                }
              />
              <div className="issueBook__btns">
                <button onClick={handleAddIssueBook}>Issue Book</button>
                <button onClick={closeAddBook}>Cancel</button>
              </div>

              <div>
                <div className="modal__studentList u-studentList--studentModalHeight">
                  {state.bookListAvailable.map((booky) => (
                    <div
                      onClick={() => changeInputValue(booky)}
                      className="modal-horizontal-cards"
                    >
                      <img
                        className="modal-horizontal-cards__image u-modal-horizontal-cards__image--books"
                        src={booky.image}
                        alt=""
                      />
                      <div>
                        <h4>{booky.title}</h4>
                        <p>{booky.book_id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <h3>Books Issued:</h3>
              <div className="studentModalContainer__book-carousel">
                {selectedStudent.books_issued.map((book) => (
                  <div key={book.book_id} className="book-item">
                    <button
                      className={`menu-icon ${state.selectedBookId === book.book_id ? "active" : ""
                        }`}
                      onClick={() => handleMenuToggle(book.book_id)}
                    >
                      <FontAwesomeIcon icon={faBars} />
                      {state.selectedBookId === book.book_id && (
                        <span className="arrow"></span>
                      )}
                    </button>
                    {state.selectedBookId === book.book_id && (
                      <ul
                        className={`menu-options ${state.selectedBookId === book.book_id ? "open" : ""
                          }`}
                      >
                        <li>
                          <a
                            className="opt1"
                            onClick={() => handleBookReturn()}
                          >
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
                    <p><span>Date of Issue: </span>
                      {new Date(book.dateOfIssue).getDate() +
                        "/" +
                        (new Date(book.dateOfIssue).getMonth() + 1) +
                        "/" +
                        new Date(book.dateOfIssue).getFullYear()}
                    </p>
                    <span
                      className={`bookStatus ${book.status === "Issued" ? "issued" : "returned"}`}
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
