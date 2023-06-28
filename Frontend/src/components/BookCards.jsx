import React, { useState } from 'react';
import { Link } from "react-router-dom";
import BookModal from './BookModal';


const BookCards = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleUpdateClick = () => {
    setSelectedBookId(book.book_id);
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleDelete = (bookId) => {
    // Write the Delete logic here
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
            <button className="btn_DEL" onClick={() => handleDelete(book.book_id)}>Delete</button>
          </div>
        </div>
      </div>

      {showModal && (
        <BookModal closeModal={closeModal} selectedBookId={selectedBookId} selectedBook={selectedBook}>

        </BookModal>
      )}

    </>
  );
};

export default BookCards;
