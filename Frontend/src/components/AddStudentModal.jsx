import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTimes } from "@fortawesome/free-solid-svg-icons";
import StudentData from "../api/StudentDataApi";

const AddStudentModal = ({ props }) => {
  const {closeModal,setUpdate} = props;
  const [fileName, setFileName] = useState("");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
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
    data.append("fname", formData.fname);
    data.append("lname", formData.lname);
    data.append("email", formData.email);
    data.append("mobile", formData.mobile);
    StudentData.postStudentData(data).then(()=>{setUpdate()});
    closeModal();
  }

  return (
    <>
      <div className="modal-wrapper"></div>
      <div className="form-container">
        <h2 className="form-container__heading">Add Student</h2>
        <div className="line"></div>
        <form autoComplete="off" className="form-container__form">
          <div className="form-container__name-fields">
            <div className="form-container__form-group">
              <label className="form-container__fieldNames" htmlFor="first-name">
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                onChange={(e) =>
                  setFormData({ ...formData, fname: e.target.value })
                }
                name="first-name"
                className="u-form-container__name-fields--firstInput"
                required
              />
            </div>
            <div className="form-container__form-group">
              <label className="form-container__fieldNames" htmlFor="last-name">
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                name="last-name"
                onChange={(e) =>
                  setFormData({ ...formData, lname: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="form-container__form-group">
            <label className="form-container__fieldNames" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="form-container__form-group__form-input"
              required
            />
          </div>

          <div className="form-container__form-group">
            <label className="form-container__fieldNames" htmlFor="phone">
              Phone No
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              className="form-container__form-group__form-input"
            />
          </div>

          <div className="form-container__form-group form-container__fileDP">
            <div>
              <div className="form-container__custom-upload form-container__center">
                <label
                  htmlFor="profile-picture"
                  className="form-container__file-label form-container__fieldNames"
                >
                  <FontAwesomeIcon icon={faUpload} /> &nbsp;Profile Picture
                </label>
                <input
                  type="file"
                  id="profile-picture"
                  name="profile-picture"
                  className="form-container__file-input"
                  required
                  onChange={handleFileChange}
                />
                <div className="form-container__file-name">
                  {fileName ? fileName : "No file chosen"}
                </div>
              </div>
            </div>
          </div>

          <div className="form-container__form-group form-container__btn-group">
            <input
              type="submit"
              value="Submit"
              onClick={(e) => handleSubmit(e)}
              className="form-container__btn u-form-container__btn--submit"
            />
          </div>
        </form>
        <button className="modal_btn_close" onClick={() => closeModal()}>
          {" "}
          <FontAwesomeIcon icon={faTimes} />{" "}
        </button>
      </div>
    </>
  );
};

export default AddStudentModal;
