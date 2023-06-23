import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const Students = lazy(() => import("./pages/Students"));
const Books = lazy(() => import("./pages/Books"));
const StudentBookInfo = lazy(() => import("./pages/BookStudentInfo"));
const BookStudentInfo = lazy(() => import("./pages/BookStudentInfo"));

const App = () => {


  return (
    <>
      {/* App */}
      <Router>
        {/* Suspense along with Lazy Loading  */}
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            {/* <Navbar/> */}
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/Students" element={<Students />}></Route>
            <Route path="/Books" element={<Books />}></Route>
            <Route
              path="/Student/BookInfo"
              element={<StudentBookInfo />}
            ></Route>
            <Route
              path="/Book/StudentInfo"
              element={<BookStudentInfo />}
            ></Route>
          </Routes>
        </Suspense>
      </Router>

      
    </>
  );
};

export default App;
