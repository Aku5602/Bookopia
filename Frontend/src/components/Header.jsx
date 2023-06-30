import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import Book from "../data/Book.json";
import { StudentContext } from "../pages/Students";
import { BookContext } from "../pages/Books";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddStudentModal from '../components/AddStudentModal';
import AddBookModal from '../components/AddBookModal';

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  //No state change when location changes
  const studentSearch = useContext(StudentContext);
  const bookSearch = useContext(BookContext);
  // console.log(studentSearch);

  const handleSearch = (event) => {
    // Search logic

    switch (location.pathname.slice(1)) {
      case 'Students': studentSearch(event.target.value);
        break;
      case 'Books': bookSearch(event.target.value);
        break;
      default: ; break;
    }

  };

  const handleStudentAdd = () => {
    console.log("Add Student clicked");
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  };

  const handleBookAdd = () => {
    console.log("Add Book clicked");
    setShowModal(true);
  }

  const renderAddButton = () => {
    if (location.pathname === '/Students') {
      return (
        <>
          <abbr title="Add Student">
            <button className="btn_add btn_add_students" onClick={handleStudentAdd}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </abbr>

          {showModal && (
            <AddStudentModal closeModal={closeModal} />
          )}
        </>
      );
    } else if (location.pathname === '/Books') {
      return (
        <>
          <abbr title="Add Book">
            <button className="btn_add btn_add_books" onClick={handleBookAdd}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </abbr>

          {showModal && (
            <AddBookModal closeModal={closeModal} />
          )}
        </>
      );
    }
  };



  return (
    <>
      {" "}
      <header>
        <div style={{ height: "100px", width: "100px" }}>
          <Link to="/">
            <Lottie animationData={Book} />
          </Link>
        </div>
        <h1 className="name">LIBRARY MANAGEMENT SYSTEM</h1>
        <div className="top-right">
          <input
            type="text"
            className="searchBar"
            placeholder="Search..."
            onChange={handleSearch}
          />
          {renderAddButton()}
        </div>
      </header>
    </>
  );
};

export default Header;
