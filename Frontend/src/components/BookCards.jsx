import React, { useState, useContext,useEffect } from "react";
import BookModal from "./BookModal";
import BookDataApi from "../api/BookDataApi";
import { UpdateContext } from "../routes/BooksPage";

const BookCards = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const updateContext = useContext(UpdateContext);

  useEffect(()=>{
    if(selectedBook && book.book_id === selectedBook.book_id) {
      setSelectedBook({...book});
    }
  },[book])


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
        <div className="book-card__book-details">
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Book ID: {book.book_id}</p>
          <div className="book-card__buttons">
            <button onClick={handleUpdateClick}>Update</button>
            <button className="book-card__buttons--del" onClick={() => handleDelete(book.no)}>
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
