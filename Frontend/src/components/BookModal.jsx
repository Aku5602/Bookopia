import { useReducer, useState, useEffect, useContext } from "react";
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
import StudentDataApi from "../api/StudentDataApi";
import BookDataApi from "../api/BookDataApi";
import { UpdateContext } from "../routes/BooksPage";

const BookModal = ({ closeModal, selectedBook }) => {
  const [editDetails, setEditDetails] = useState(selectedBook);
  const updateContext = useContext(UpdateContext);

  useEffect(()=>{
    setEditDetails(selectedBook);
  },[selectedBook])

  const initialState = {
    isEditEnabled: false,
    editedFieldIndex: null,
    isStudentListClicked: false,
    showAlert: false,
    progressBarVisible: false,
    isAddingStudent: false,
    update: false,
    studentID: "",
    studentListAvailable: [],
    isBookListVisible: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case "setIsEditEnabled":
        return { ...state, isEditEnabled: action.payload };
      case "setEditedFieldIndex":
        return { ...state, editedFieldIndex: action.payload };
      case "setStudentListClicked":
        return { ...state, isStudentListClicked: action.payload };
      case "setShowAlert":
        return { ...state, showAlert: action.payload };
      case "setProgressBarVisible":
        return { ...state, progressBarVisible: action.payload };
      case "setIsAddingStudent":
        return { ...state, isAddingStudent: action.payload };
      case "setUpdate":
        return { ...state, update: action.payload };
      case "setStudentID":
        return { ...state, studentID: action.payload };
      case "setStudentListAvailable":
        return { ...state, studentListAvailable: action.payload };
      case "setBookListVisible":
        return { ...state, isBookListVisible: action.payload };
      default:
        throw new Error();
    }
  }

  useEffect(() => {
    StudentDataApi.getStudentDataAvailable(selectedBook.book_id).then((res) => {
      dispatch({ type: "setStudentListAvailable", payload: [...res.data] });
    });
  }, [state.update]);

  const handleEditClick = (index) => {
    dispatch({ type: "setEditedFieldIndex", payload: index });
    dispatch({ type: "setIsEditEnabled", payload: true });
  };

  const handleTickClick = (key) => {
    dispatch({ type: "setIsEditEnabled", payload: false });

    const obj = { _id: editDetails._id };
    if (
      editDetails[key].trim().toLowerCase() ===
      selectedBook[key].trim().toLowerCase()
    ) {
      return 0;
    } else {
      obj["key"] = key;
      obj["value"] = editDetails[key];
      BookDataApi.patchBookData(obj).then(() => {
        updateContext();
      });
    }
  };

  const handleStudentListClick = () => {
    dispatch({
      type: "setStudentListClicked",
      payload: !state.isStudentListClicked,
    });
  };

  const handleAddStudent = () => {
    dispatch({ type: "setIsAddingStudent", payload: !state.isAddingStudent });
    dispatch({ type: "setBookListVisible", payload: true });
  };

  const handleAssign = () => {
    const objStudent = state.studentListAvailable.filter(
      (item) => item.id === state.studentID
    );
    if (
      !state.studentID.trim().length ||
      !objStudent.length ||
      state.studentID.trim().toLowerCase() !==
        objStudent[0].id.trim().toLowerCase()
    ) {
      return 0;
    }
    if (+selectedBook.quantity == 0) {
      // Add here your book issue limit has reached.
      alert("All copies of book are used");
      return 0;
    }

    const obj = { id: state.studentID, book_id: selectedBook.book_id };
    obj._id = objStudent[0]._id;
    obj.id = objStudent[0].id;
    obj.profilePicture = objStudent[0].profilePicture;
    obj.name = objStudent[0].name;
    obj.image = selectedBook.image;
    obj.title = selectedBook.title;
    obj.author = selectedBook.author;
    obj.no = selectedBook.no;
    obj.dateOfIssue = new Date();
    StudentDataApi.patchStudentBookInfo(obj).then(() => {
      updateContext();
      dispatch({ type: "setStudentID", payload: "" });
      dispatch({ type: "setUpdate", payload: !state.update });
      dispatch({ type: "setIsAddingStudent", payload: false });
    });
  };

  const handleDeleteStudent = (id) => {
    const obj = {};
    obj._id = id;
    obj.book_id = selectedBook.book_id;
    StudentDataApi.deleteStudentDataBookInfo(obj).then(() => {
      updateContext();
      dispatch({ type: "setUpdate", payload: !state.update });
    });
  };

  const handleCancel = () => {
    dispatch({ type: "setIsAddingStudent", payload: false });
    dispatch({ type: "setStudentID", payload: "" });
    dispatch({ type: "setBookListVisible", payload: false });
  };

  function changeInputValue(student) {
    dispatch({ type: "setStudentID", payload: student.id });
  }

  const studentListButtonText = state.isStudentListClicked
    ? "Edit Details"
    : "Student List";
  const studentListButtonStyle = {
    color: state.isStudentListClicked ? "#000" : "#fff",
    backgroundColor: state.isStudentListClicked ? "lightgreen" : "#2196f3",
  };

  const handleCopyClick = () => {
    const studentId = document.querySelector(".book_id_copy");
    if (studentId) {
      copy(studentId.textContent);
    }
    dispatch({ type: "setShowAlert", payload: true });
  };

  useEffect(() => {
    let progressBarTimeout;
    if (state.showAlert) {
      dispatch({ type: "setProgressBarVisible", payload: true });
      progressBarTimeout = setTimeout(() => {
        dispatch({ type: "setProgressBarVisible", payload: false });
        dispatch({ type: "setShowAlert", payload: false });
      }, 3000);
    }
    return () => {
      clearTimeout(progressBarTimeout);
    };
  }, [state.showAlert]);

  return (
    <>
      <div className="modal-wrapper"></div>

      <div className="bookModalContainer modal_content u-modal_content--bookModalContainer">
        <div className="col-1-of-2 bookModalContainer__infobookDetails">
          <button className="modal_btn_close" onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <div className="book-profile">
            <img className="book-profile__book-image" src={editDetails.image} alt="User" />
            <div>
              <h2 className="book-profile__book-name">{editDetails.title}</h2>
              <h4>{editDetails.author}</h4>
            </div>
          </div>

          <div className="details-container">
            <p>{editDetails.description}</p>

            <p className="details-container__bookId">
              BookID:
              <span className="book_id_copy">
                <strong>{editDetails.book_id}</strong>
              </span>
              &nbsp;&nbsp;
              <abbr title="Copy to Clipboard">
                <span className="copyId" onClick={handleCopyClick}>
                  <FontAwesomeIcon icon={faCopy} />
                </span>
              </abbr>
            </p>
            <div className="stats u__stats--bookModalContainer">
              <label>Quantity:</label>
              <span>{editDetails.quantity}</span>
              <label>Copies Issued:</label>
              <span>{editDetails.copies_issued}</span>
            </div>

            <button
              onClick={handleStudentListClick}
              style={studentListButtonStyle}
            >
              {studentListButtonText} &nbsp;&rarr;
            </button>
          </div>
        </div>
        <div className="col-1-of-2 bookModalContainer__editDetails">
          {state.isStudentListClicked ? (
            <div>
              {!state.isAddingStudent && (
                <div className="isStudentNotClicked">
                  <h3>Enrolled Students:</h3>
                  <button
                    className="bookModalContainer__addStudent"
                    onClick={handleAddStudent}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              )}
              {state.isAddingStudent ? (
                <div>
                  <h3>Add a Student</h3>
                  <input
                    type="text"
                    placeholder="Enter student id"
                    defaultValue={state.studentID}
                    onChange={(e) =>
                      dispatch({
                        type: "setStudentID",
                        payload: e.target.value,
                      })
                    }
                  />
                  <div className="issueBook__btns">
                    <button onClick={handleAssign}>Add</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                  <div className="modal__studentList u-studentList--bookModalHeight">
                    <p>Select a student from the list below or enter the id manually:</p>
                    {state.studentListAvailable.map((stud) => (
                      <div
                        onClick={() => changeInputValue(stud)}
                        className="modal-horizontal-cards modal_BookCards"
                      >
                        <img
                          className="modal-horizontal-cards__image u-modal-horizontal-cards__image--round"
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
                <div className="modal__studentList">
                  {selectedBook.students_info.map((student) => (
                    <div className="modal-horizontal-cards">
                      <img
                        className="modal-horizontal-cards__image"
                        src={student.profilePicture}
                        alt=""
                      />
                      <div>
                        <h4>{student.name}</h4>
                        <p>{student.id}</p>
                      </div>
                      <button
                        className="bookModalContainer__delete-icon"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="bookModalContainer__editBookInfo">
                <h3>Edit book details:</h3>
                <div className="line"></div>
                <div className="input-container">
                  <label className="labels">Book Name:</label>
                  <br />
                  <input
                    type="text"
                    defaultValue={selectedBook.title}
                    disabled={
                      !state.isEditEnabled || state.editedFieldIndex !== 0
                    }
                    className={
                      state.isEditEnabled && state.editedFieldIndex === 0
                        ? "editable-field"
                        : "nonEditable-field"
                    }
                    onChange={(e) => {
                      setEditDetails({ ...editDetails, title: e.target.value });
                    }}
                  />
                  {state.isEditEnabled && state.editedFieldIndex === 0 ? (
                    <span
                      className="edit-icon"
                      onClick={() => handleTickClick("title")}
                    >
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
                    disabled={
                      !state.isEditEnabled || state.editedFieldIndex !== 1
                    }
                    className={
                      state.isEditEnabled && state.editedFieldIndex === 1
                        ? "editable-field"
                        : "nonEditable-field"
                    }
                    onChange={(e) => {
                      setEditDetails({
                        ...editDetails,
                        book_id: e.target.value,
                      });
                    }}
                  />
                  {state.isEditEnabled && state.editedFieldIndex === 1 ? (
                    <span
                      className="edit-icon"
                      onClick={() => handleTickClick("book_id")}
                    >
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
                    disabled={
                      !state.isEditEnabled || state.editedFieldIndex !== 2
                    }
                    className={
                      state.isEditEnabled && state.editedFieldIndex === 2
                        ? "editable-field"
                        : "nonEditable-field"
                    }
                    onChange={(e) => {
                      setEditDetails({
                        ...editDetails,
                        author: e.target.value,
                      });
                    }}
                  />
                  {state.isEditEnabled && state.editedFieldIndex === 2 ? (
                    <span
                      className="edit-icon"
                      onClick={() => handleTickClick("author")}
                    >
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
                    disabled={
                      !state.isEditEnabled || state.editedFieldIndex !== 3
                    }
                    className={
                      state.isEditEnabled && state.editedFieldIndex === 3
                        ? "editable-field"
                        : "nonEditable-field"
                    }
                    onChange={(e) => {
                      setEditDetails({ ...editDetails, image: e.target.value });
                    }}
                  />
                  {state.isEditEnabled && state.editedFieldIndex === 3 ? (
                    <span
                      className="edit-icon"
                      onClick={() => handleTickClick("image")}
                    >
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
                    disabled={
                      !state.isEditEnabled || state.editedFieldIndex !== 4
                    }
                    className={
                      state.isEditEnabled && state.editedFieldIndex === 4
                        ? "editable-field textareaDescE"
                        : "nonEditable-field textareaDesc"
                    }
                    cols={40}
                    onChange={(e) => {
                      setEditDetails({
                        ...editDetails,
                        description: e.target.value,
                      });
                    }}
                  />
                  {state.isEditEnabled && state.editedFieldIndex === 4 ? (
                    <span
                      className="edit-icon"
                      onClick={() => handleTickClick("description")}
                    >
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
      {state.showAlert && (
        <div className="alert-box">
          <FontAwesomeIcon icon={faCheckCircle} className="alert-icon" />
          <span className="alert-message">
            {" "}
            &nbsp;&nbsp;Book ID copied to clipboard
          </span>
          {state.progressBarVisible && <div className="progress-bar"></div>}
        </div>
      )}
    </>
  );
};

export default BookModal;
