import React,{useEffect,useContext, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import Book from "../data/Book.json";
import { StudentContext } from "../pages/Students";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const location = useLocation();
  //No state change when location changes
  const studentSearch = useContext(StudentContext);
  // console.log(studentSearch);

  const handleSearch = (event) => {
    // Search logic

    switch (location.pathname.slice(1)) {
      case 'Students' : studentSearch(event.target.value);
                        break;
      case 'Books' :  
                     break;
      default : console.log ("No item found");
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

          <button className="btn_add">
          <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
