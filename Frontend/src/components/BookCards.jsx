import React, { useState, useContext } from "react";
import BookModal from "./BookModal";
import BookDataApi from "../api/BookDataApi";
import { UpdateContext } from "../pages/BooksPage";

const BookCards = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const updateContext = useContext(UpdateContext);

  const handleUpdateClick = () => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleDelete = (oldBookID) => {
    BookDataApi.deleteBookData(oldBookID).then(() => {
      updateContext();
    });
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
            <button className="btn_DEL" onClick={() => handleDelete(book.no)}>
              Delete
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <BookModal
          closeModal={closeModal}
          selectedBook={selectedBook}
        ></BookModal>
      )}
    </>
  );
};

export default BookCards;
