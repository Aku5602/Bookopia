import React, { useReducer, createContext, useEffect } from "react";
import "../styles/Students.css";
import StudentCards from "../components/StudentCards";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import StudentData from "../api/StudentDataApi";


export const StudentContext = createContext();
export const UpdateContext = createContext();

const Students = () => {
  // const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [studentList, setStudentList] = useState([]);
  // const [currList, setCurrentList] = useState([]);
  // const [showNoResults, setShowNoResults] = useState(false);
  // const [deleteUpdate, setDeleteUpdate] = useState(0);


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
    dispatch({ type: "setLoading", payload:true });

    // setLoading(true);
    StudentData.getStudentData().then((res) => {
      dispatch({ type: "setCurrentList", payload:[...res.data]});
        // setCurrentList([...res.data]);
        dispatch({ type: "setStudentList", payload:[...res.data]});
        // setStudentList([...res.data]);
    dispatch({ type: "setLoading", payload:false });

        // setLoading(false);
    });

  }, []);

  useEffect(() => {
    StudentData.getStudentData().then((res) => {
        // setCurrentList([...res.data]);
      dispatch({ type: "setCurrentList", payload:[...res.data]});
      dispatch({ type: "setStudentList", payload:[...res.data]});

        // setStudentList([...res.data]);
    });
  }, [state.update]);

  const studentsPerPage = 12;
  const totalStudents = state.currList.length;
  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  const startIndex = (state.currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;

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

    dispatch({ type: "setCurrentPage", payload:1});
    dispatch({ type: "setCurrentList", payload:arr});
  }

  const handlePageChange = (pageNumber) => {
    // setCurrentPage(pageNumber);
    dispatch({ type: "setCurrentPage", payload:pageNumber});

  };

  return (
    <div className="library-management-system">
      <StudentContext.Provider value={studentSearch}>
        <Header />
      </StudentContext.Provider>

      {state.loading && <h1 className="load">Loading...</h1>}
      <div className="student-carousel">
        {state.currList.slice(startIndex, endIndex).map((student) => (
          <UpdateContext.Provider key={student.id} value={setUpdate}>
            <StudentCards key={student.id} student={student} />
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

export default Students;
