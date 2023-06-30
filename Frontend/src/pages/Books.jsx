import React, { useState, createContext } from "react";
import "../styles/Books.css";
import books from "../data/BooksInventory";
import BookCards from "../components/BookCards";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export const BookContext = createContext();

const Books = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bookList, setBookList] = useState(books);
  const [currList, setCurrentList] = useState(bookList);
  const [showNoResults, setShowNoResults] = useState(false);

  const booksPerPage = 12;
  const totalBooks = currList.length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;


  function bookSearch(text) {
    text = text.trim().toLowerCase();
    const arr = bookList.filter((book) => {
      if (
        book.title.toLowerCase().includes(text) ||
        book.author.toLowerCase().includes(text) ||
        book.book_id.toLowerCase().includes(text)
      ) {

        return true;
      }
      return false;

    });

    if (arr.length === 0) {
      setShowNoResults(true);
    } else {
      setShowNoResults(false);
    }
    setCurrentPage(1);
    setCurrentList(arr);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="library-management-system">
      <BookContext.Provider value={bookSearch}>
        <Header />
      </BookContext.Provider>

      <div className="book-carousel">
        {currList.slice(startIndex, endIndex).map((book) => (
          <BookCards key={book.book_id} book={book} />
        ))}
        {showNoResults && <span className="no-results"><FontAwesomeIcon icon={faExclamationCircle} /> &nbsp;No matching results found!</span>}
      </div>

      <div className="pagination-container">
        <ul className="pagination">
          {[...Array(totalPages)].map((item, index) => {
            return (
              <li
                key={index + 1}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="footer_container">
        <Footer />
      </div>
    </div>
  );
};

export default Books;
