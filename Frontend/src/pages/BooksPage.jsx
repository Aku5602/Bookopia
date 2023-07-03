import React, { useEffect, useState, createContext, useReducer } from "react";
import "../styles/Books.css";
import BookCards from "../components/BookCards";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import BookData from "../api/BookDataApi";

export const BookContext = createContext();
export const UpdateContext = createContext();

const Books = () => {
  // const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [bookList, setBookList] = useState([]);
  // const [currList, setCurrentList] = useState([]);
  // const [showNoResults, setShowNoResults] = useState(false);
  // const [update, setUpdate] = useState(0);

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
    // setLoading(true);
    dispatch({ type: "setLoading", payload:true });
    BookData.getBookData().then((res) => {
      // setBookList([...res.data]);
      dispatch({ type: "setCurrentList", payload:[...res.data]});
      dispatch({ type: "setBookList", payload:[...res.data]});
    dispatch({ type: "setLoading", payload:false });

      // setLoading(false);
      // setCurrentList([...res.data]);
     

    });
  }, [state.update]);

  const booksPerPage = 12;
  const totalBooks = state.currList.length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  const startIndex = (state.currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;

  // function createNewStudent() {}

  function setUpdate() {
    if (state.update) {
      dispatch({ type: "setUpdate", payload:0});

      // setDeleteUpdate(0);
    } else {
      // setDeleteUpdate(1);
      dispatch({ type: "setUpdate", payload:1});

    }
  }

  function setShowResults(value) {
    dispatch({ type: "setShowNoResults", payload: value});

    // setShowNoResults(value);
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
      // dispatch({ type: "setShowResults", payload:true});

      setShowResults(true);
    } else {
      // dispatch({ type: "setShowResults", payload:false});

      setShowResults(false);
    }
    // console.log(text);


   
    dispatch({ type: "setCurrentPage", payload:1});
    dispatch({ type: "setCurrentList", payload:arr});

  }

  const handlePageChange = (pageNumber) => {
    // setCurrentPage(pageNumber);
    dispatch({ type: "setCurrentPage", payload:pageNumber});

  };

  return (
    <div className="library-management-system">
      <BookContext.Provider value={bookSearch}>
        <Header />
      </BookContext.Provider>

      {state.loading && <h1>Loading...</h1>}
      <div className="book-carousel">
        {state.currList.slice(startIndex, endIndex).map((book,index) => (
          <UpdateContext.Provider key={index} value={setUpdate}>
            <BookCards key={index} book={book} />
          </UpdateContext.Provider>
        ))}
        {state.showNoResults && (
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
                className={state.currentPage === index + 1 ? "active" : ""}
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
