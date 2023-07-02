import React, { useReducer, useState } from "react";
import "../styles/AddStudentModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTimes } from "@fortawesome/free-solid-svg-icons";
import StudentData from "../api/StudentDataApi";


const AddStudentModal = ({ closeModal }) => {
    const [fileName, setFileName] = useState("");
    const [formData,setFormData] = useState({
        fname:"",
        lname:"",
        email:"",
        mobile:"",
        file:"",
    })
    

    const data = new FormData();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // console.log(file);
        setFileName(file.name); // Update the state with the chosen file name
        setFormData({...formData,'file':file})

    };

    function handleSubmit (e) {
        e.preventDefault();
        // let response;
        data.append('file',formData.file);
        data.append('fname',formData.fname);
        data.append('lname',formData.lname);
        data.append('email',formData.email);
        data.append('mobile',formData.mobile);

    

        StudentData.postStudentData(data);
   
        // console.warn(response);
        closeModal();
    }

    return (
        <>
            <div className="modal-wrapper"></div>
            <div className="form-container">
                <h2>Add Student</h2>
                <div className="line"></div>
                <form autoComplete="off">
                    <div className="name-fields">
                        <div className="form-group">
                            <label className="fieldNames" htmlFor="first-name">First Name</label>
                            <input type="text" id="first-name" onChange={(e)=>setFormData({...formData,'fname':e.target.value})}  name="first-name" className="name-fields__form-input1"  required/>
                        </div>
                        <div className="form-group">
                            <label className="fieldNames" htmlFor="last-name">Last Name</label>
                            <input type="text" id="last-name" name="last-name" onChange={(e)=>setFormData({...formData,'lname':e.target.value})} className="name-fields__form-input2" required />
                        </div>
                    </div>

                    {/* <div className="form-group">
                        <label className="fieldNames" htmlFor="PRN">Email</label>
                        <input type="text" id="PRN" name="PRN" onChange={(e)=>FormData.set('PRN',e.target.value)} className="form-group__form-input" required />
                    </div> */}

                    <div className="form-group">
                        <label className="fieldNames" htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" onChange={(e)=>setFormData({...formData,'email':e.target.value})} className="form-group__form-input" required/>
                    </div>

                    <div className="form-group">
                        <label className="fieldNames" htmlFor="phone">Phone No</label>
                        <input type="text" id="phone" name="phone" onChange={(e)=>setFormData({...formData,'mobile':e.target.value})} className="form-group__form-input"  />
                    </div>

                    <div className="form-group fileDP">
                        <div>
                            <div className="custom-upload center">
                                <label htmlFor="profile-picture" className="file-label fieldNames">
                                    <FontAwesomeIcon icon={faUpload} /> &nbsp;Profile Picture
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

                    <div className="form-group btn-group">
                        <input type="submit" value="Submit" onClick={(e)=>handleSubmit(e)} className="btn submitBtn" />
                    </div>
                </form>
                <button className="modal_btn_close" onClick={()=>closeModal()}> <FontAwesomeIcon icon={faTimes} /> </button>
            </div>
        </>
    );
}

export default AddStudentModal;
