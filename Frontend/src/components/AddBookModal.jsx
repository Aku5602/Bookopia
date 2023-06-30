import React, { useState } from "react";
import "../styles/AddBookModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AddStudentModal = ({ closeModal }) => {

    return (
        <>
            <div className="modal-wrapper"></div>
            <div className="form-container">
                <h2>Add Book</h2>
                <div className="line"></div>
                <form autoComplete="off">

                    <div className="form-group">
                        <label className="fieldNames" htmlFor="email">Book Title</label>
                        <input type="text" id="email" name="email" className="form-group__form-input" required />
                    </div>

                    <div className="form-group">
                        <label className="fieldNames" htmlFor="phone">Author</label>
                        <input type="text" id="phone" name="phone" className="form-group__form-input" required />
                    </div>

                    <div className="form-group">
                        <label className="fieldNames" htmlFor="phone">Image URL</label>
                        <input type="text" id="phone" name="phone" className="form-group__form-input" required />
                    </div>

                    <div className="form-group">
                        <label className="fieldNames" htmlFor="phone">Description</label>
                        <input type="text" id="phone" name="phone" className="form-group__form-input" required />
                    </div>

                    <div className="name-fields name-fields--margin-bottom-large">
                        <div className="form-group">
                            <label className="fieldNames" htmlFor="first-name">Quantity</label>
                            <input type="text" id="first-name" name="first-name" className="name-fields__form-input1" required />
                        </div>
                        <div className="form-group">
                            <label className="fieldNames" htmlFor="last-name">BookID</label>
                            <input type="text" id="last-name" name="last-name" className="name-fields__form-input2" required />
                        </div>
                    </div>

                    <div className="form-group btn-group btn--top-margin">
                        <input type="submit" value="Submit" className="btn submitBtn" />
                    </div>
                </form>
                <button className="modal_btn_close" onClick={closeModal}> <FontAwesomeIcon icon={faTimes} /> </button>
            </div>
        </>
    );
}

export default AddStudentModal;
