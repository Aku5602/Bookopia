import React, { useEffect, useState, createContext } from "react";
import "../styles/Books.css";
import books from "../data/BooksInventory";
import BookCards from "../components/BookCards";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import BookData from "../api/BookDataApi";

export const BookContext = createContext();
export const DeleteContext = createContext();

const Books = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookList, setBookList] = useState([]);
  const [currList, setCurrentList] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [deleteUpdate, setDeleteUpdate] = useState(0);

  useEffect(() => {
    setLoading(true);
    BookData.getBookData().then((res) => {
      setBookList([...res.data]);
      setLoading(false);
      setCurrentList([...res.data]);
    });
  }, [deleteUpdate]);

  const booksPerPage = 12;
  const totalBooks = currList.length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;

  function createNewStudent() {}

  function deleteOneBook() {
    if (deleteUpdate) {
      setDeleteUpdate(0);
    } else {
      setDeleteUpdate(1);
    }
  }

  function setShowResults(value) {
    setShowNoResults(value);
  }

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
      setShowResults(true);
    } else {
      setShowResults(false);
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

      {loading && <h1>Loading...</h1>}
      <div className="book-carousel">
        {currList.slice(startIndex, endIndex).map((book) => (
          <DeleteContext.Provider key={book.no} value={deleteOneBook}>
            <BookCards key={book.no} book={book} />
          </DeleteContext.Provider>
        ))}
        {showNoResults && (
          <span className="no-results">
            <FontAwesomeIcon icon={faExclamationCircle} /> &nbsp;No matching
            results found!
          </span>
        )}
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
