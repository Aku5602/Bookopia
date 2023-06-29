import React, { useState, createContext, useEffect } from "react";
import "../styles/Students.css";
import students from "../data/Student";
import StudentCards from "../components/StudentCards";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import StudentData from "../api/StudentData";


export const StudentContext = createContext();
export const DeleteContext = createContext();

const Students = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentList, setStudentList] = useState(students);
  const [currList, setCurrentList] = useState(studentList);
  // console.log("called");
  const [showNoResults, setShowNoResults] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState([]);

  useEffect(() => {
    setLoading(true);
    StudentData.getStudentData().then((res) => {
      setStudentList(res.data);
      setLoading(false);
      setCurrentList([...res.data]);
    });
  }, [deleteStatus]);

  const studentsPerPage = 12;
  const totalStudents = currList.length;
  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;

  function createNewStudent() {}

  function deleteOneStudent(value) {
    setDeleteStatus([...value]);
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

      <div className="student-carousel">
        {currList.slice(startIndex, endIndex).map((student) => (
          <DeleteContext.Provider key={student.id} value={deleteOneStudent}>
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
