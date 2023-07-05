import React, { useEffect, useState, createContext, useReducer } from "react";
import BookCards from "../components/BookCards";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import BookData from "../api/BookDataApi";
import Lottie from "lottie-react";
import loading from "../public/loading.json";
import cat from "../public/Cat.json";

export const BookContext = createContext();
export const UpdateContext = createContext();

const Books = () => {
  const initialState = {
    loading: false,
    currentPage: 1,
    bookList: [],
    currList: [],
    showNoResults: false,
    update: 0
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case "setLoading":
        return { ...state, loading: action.payload };
      case "setCurrentPage":
        return { ...state, currentPage: action.payload };
      case "setBookList":
        return { ...state, bookList: action.payload };
      case "setCurrentList":
        return { ...state, currList: action.payload };
      case "setShowNoResults":
        return { ...state, showNoResults: action.payload };
      case "setUpdate":
        return { ...state, update: action.payload };
      default:
        throw new Error();
    }
  }


  useEffect(() => {
    dispatch({ type: "setLoading", payload: true });
    BookData.getBookData().then((res) => {
      dispatch({ type: "setCurrentList", payload: [...res.data] });
      dispatch({ type: "setBookList", payload: [...res.data] });
      dispatch({ type: "setLoading", payload: false });
    });
  }, [state.update]);

  const booksPerPage = 12;
  const totalBooks = state.currList.length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const startIndex = (state.currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;

  function setUpdate() {
    if (state.update) {
      dispatch({ type: "setUpdate", payload: 0 });
    } else {
      dispatch({ type: "setUpdate", payload: 1 });

    }
  }

  function setShowResults(value) {
    dispatch({ type: "setShowNoResults", payload: value });
  }

  function bookSearch(text) {
    text = text.trim().toLowerCase();

    const arr = state.bookList.filter((book) => {
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

    dispatch({ type: "setCurrentPage", payload: 1 });
    dispatch({ type: "setCurrentList", payload: arr });

  }

  const handlePageChange = (pageNumber) => {
    dispatch({ type: "setCurrentPage", payload: pageNumber });
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="bookPageContainer">
      <BookContext.Provider value={bookSearch}>
        <Header setUpdate={setUpdate}/>
      </BookContext.Provider>

      {state.loading && <Lottie animationData={loading} className="loadingWidget" />}
      <div className="bookPageContainer__carousel">
        {state.currList.slice(startIndex, endIndex).map((book, index) => (
          <UpdateContext.Provider key={index} value={setUpdate}>
            <BookCards key={index} book={book} />
          </UpdateContext.Provider>
        ))}
        {state.showNoResults && (
          <div className="noResultsWidget">
          <Lottie animationData={cat} className="noResultsWidget__catAnime" />
          <div>
            <span>
              <FontAwesomeIcon className="noResultsWidget__exclaimIcon" icon={faExclamationCircle} />
              &nbsp;
              No results found
            </span>
            <p>Please try again with another keywords or maybe use generic information</p>
              <button onClick={handleReload} className="btn--blackBtn"> &larr; &nbsp; Go Back</button>
          </div>
        </div>
        )}
      </div>

      <div className="pagination-container  u-pagination-container--booksPage">
        <ul className="pagination-container__paginationWidget">
          {[...Array(totalPages)].map((item, index) => {
            return (
              <li
                key={index + 1}
                className={state.currentPage === index + 1 ? "active" : ""}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </li>
            );
          })}
        </ul>
      </div>

      <Footer className="footer--books" />
    </div>
  );
};

export default Books;
