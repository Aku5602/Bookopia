import React, { useState, createContext, useEffect } from "react";
import "../styles/Students.css";
import StudentCards from "../components/StudentCards";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import StudentData from "../api/StudentDataApi";


export const StudentContext = createContext();
export const DeleteContext = createContext();

const Students = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentList, setStudentList] = useState([]);
  const [currList, setCurrentList] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [deleteUpdate, setDeleteUpdate] = useState(0);

  useEffect(() => {
    let isCurrent = true;
    setLoading(true);
    StudentData.getStudentData().then((res) => {
      if(isCurrent) {
        setCurrentList([...res.data]);
        setStudentList([...res.data]);
        setLoading(false);
      }


    });
    return () =>{
      isCurrent = false;
    }
  }, [deleteUpdate]);

  const studentsPerPage = 12;
  const totalStudents = currList.length;
  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;

  function createNewStudent() {}

  function deleteOneUpdate() {
    if (deleteUpdate) {
      setDeleteUpdate(0);
    } else {
      setDeleteUpdate(1);
    }
  }

  function setShowResults(value) {
    setShowNoResults(value);
  }

  function studentSearch(text) {
    text = text.trim().toLowerCase();
    const arr = studentList.filter((item) => {
      if (
        item.id.toLowerCase().includes(text) ||
        item.name.toLowerCase().includes(text) ||
        item.mobile.toLowerCase().includes(text) ||
        item.email.toLowerCase().includes(text)
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
    setCurrentList(() => arr);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="library-management-system">
      <StudentContext.Provider value={studentSearch}>
        <Header />
      </StudentContext.Provider>

      {loading && <h1>Loading...</h1>}
      <div className="student-carousel">
        {currList.slice(startIndex, endIndex).map((student) => (
          <DeleteContext.Provider key={student.id} value={deleteOneUpdate}>
            <StudentCards key={student.id} student={student} />
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

export default Students;
