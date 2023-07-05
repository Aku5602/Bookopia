import React, { useReducer, createContext, useEffect } from "react";
import StudentCards from "../components/StudentCards";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import StudentData from "../api/StudentDataApi";
import Lottie from "lottie-react";
import loading from "../public/loading.json";
import cat from "../public/Cat.json";

export const StudentContext = createContext();
export const UpdateContext = createContext();

const Students = () => {
  const initialState = {
    loading: false,
    currentPage: 1,
    studentList: [],
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
        return { ...state, studentList: action.payload };
      case "setCurrentList":
        return { ...state, currList: action.payload };
      case "setStudentList":
        return { ...state, studentList: action.payload };
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
    StudentData.getStudentData().then((res) => {
      dispatch({ type: "setCurrentList", payload: [...res.data] });
      dispatch({ type: "setStudentList", payload: [...res.data] });
      dispatch({ type: "setLoading", payload: false });
    });

  }, []);

  useEffect(() => {
    StudentData.getStudentData().then((res) => {
      dispatch({ type: "setCurrentList", payload: [...res.data] });
      dispatch({ type: "setStudentList", payload: [...res.data] });
    });
  }, [state.update]);

  const studentsPerPage = 12;
  const totalStudents = state.currList.length;
  const totalPages = Math.ceil(totalStudents / studentsPerPage);
  const startIndex = (state.currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;

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

  function studentSearch(text) {
    text = text.trim().toLowerCase();
    const arr = state.studentList.filter((item) => {
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
    <div className="studentPageContainer">
      <StudentContext.Provider value={studentSearch}>
        <Header setUpdate={setUpdate}/>
      </StudentContext.Provider>

      {state.loading && <Lottie animationData={loading} className="loadingWidget" />}
      <div className="studentPageContainer__carousel">
        {state.currList.slice(startIndex, endIndex).map((student) => (
          <UpdateContext.Provider key={student.id} value={setUpdate}>
            <StudentCards key={student.id} student={student} />
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

      <div className="pagination-container">
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
      <Footer />
    </div>
  );
};

export default Students;
