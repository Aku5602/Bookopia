import React, { useState } from "react";
import "../styles/AddBookModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTimes } from "@fortawesome/free-solid-svg-icons";
import BookData from "../api/BookDataApi";

const AddStudentModal = ({ closeModal }) => {
  const [fileName, setFileName] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    quantity: "",
    book_id: "",
    author: "",
    description: "",
    file: "",
  });

  const data = new FormData();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setFormData({ ...formData, file: file });
  };

  function handleSubmit(e) {
    e.preventDefault();
    data.append("file", formData.file);
    data.append("book_id", formData.book_id);
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("description", formData.description);
    data.append("quantity", formData.quantity);

    BookData.postBookData(data);
    closeModal();
  }

  return (
    <>
      <div className="modal-wrapper"></div>
      <div className="form-container">
        <h2>Add Book</h2>
        <div className="line"></div>
        <form autoComplete="off">
          <div className="form-group">
            <label className="fieldNames" htmlFor="email">
              Book Title
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="form-group__form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="fieldNames" htmlFor="phone">
              Author
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="form-group__form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="fieldNames" htmlFor="phone">
              Description
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="form-group__form-input"
              required
            />
          </div>

          <div className="name-fields name-fields--margin-bottom-large">
            <div className="form-group">
              <label className="fieldNames" htmlFor="first-name">
                Quantity
              </label>
              <input
                type="text"
                id="first-name"
                name="first-name"
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="name-fields__form-input1"
                required
              />
            </div>
            <div className="form-group">
              <label className="fieldNames" htmlFor="last-name">
                BookID
              </label>
              <input
                type="text"
                id="last-name"
                name="last-name"
                onChange={(e) =>
                  setFormData({ ...formData, book_id: e.target.value })
                }
                className="name-fields__form-input2"
                required
              />
            </div>
          </div>

          <div className="form-group fileDP">
            <div>
              <div className="custom-upload center">
                <label
                  htmlFor="profile-picture"
                  className="file-label fieldNames"
                >
                  <FontAwesomeIcon icon={faUpload} /> &nbsp;Book Image
                </label>
                <input
                  type="file"
                  id="profile-picture"
                  name="profile-picture"
                  className="file-input"
                  required
                  onChange={handleFileChange}
                />
                <div className="file-name">
                  {fileName ? fileName : "No file chosen"}
                </div>
              </div>
            </div>
          </div>

          <div className="form-group btn-group btn--top-margin">
            <input
              type="submit"
              value="Submit"
              onClick={(e) => handleSubmit(e)}
              className="btn submitBtn"
            />
          </div>
        </form>
        <button className="modal_btn_close" onClick={closeModal}>
          {" "}
          <FontAwesomeIcon icon={faTimes} />{" "}
        </button>
      </div>
    </>
  );
};

export default AddStudentModal;
