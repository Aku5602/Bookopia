import React, { useState,useContext } from 'react';
import { Link } from "react-router-dom";
import BookModal from './BookModal';

import studentsss from "../data/Studentsss.jsx";

import BookDataApi from '../api/BookDataApi';
import { DeleteContext } from "../pages/Books";


const BookCards = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const deleteUpdate= useContext(DeleteContext);

  const handleUpdateClick = () => {
    setSelectedBookId(book.book_id);
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleDelete = (oldBookID) => {
    // Write the Delete logic here 
    BookDataApi.deleteBookData(oldBookID).then((res)=>{deleteUpdate()});  
    
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="book-card">
        <img src={book.image} alt="Book" />
        <div className="book-details">
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Book ID: {book.book_id}</p>
          <div className="buttons">
            <button onClick={handleUpdateClick}>Update</button>
            <button className="btn_DEL" onClick={() => handleDelete(book.no)}>Delete</button>
          </div>
        </div>
      </div>

      {showModal && (
        <BookModal closeModal={closeModal} selectedBookId={selectedBookId} selectedBook={selectedBook} studentsss={studentsss}>

        </BookModal>
      )}

    </>
  );
};

export default BookCards;
