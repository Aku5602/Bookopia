import React, { useState, createContext } from "react";
import "../styles/Students.css";
import students from "../data/Student";
import StudentCards from "../components/StudentCards";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const StudentContext = createContext();

const Students = () => {
  // To denote that the current page of the carousel
  const [currentPage, setCurrentPage] = useState(1);
  const [studentList, setStudentList] = useState(students);
  const [currList, setCurrentList] = useState(studentList);

  // Ha number denote karto ki kiti students eka page varti display hotil
  const studentsPerPage = 12;

  // Ithe total number of student is required here, to count the total number of pages.

  const totalStudents = currList.length; //Will be decided aand given by API call

  //Useffect with Api call to fetch all students data

  // Calculate the total number of pages required to show up all the students
  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;

  function studentSearch(text) {
    console.log(text);
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

    })

    setCurrentList(arr);

    console.log(arr);
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
          <StudentCards
            key={student.id}
            student={student}
          />
        ))}
      </div>

      <div className="pagination-container">
        <ul className="pagination">
          {[...Array(totalPages)].map((item, index) => {
            return <li
              key={index + 1}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </li>;
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
