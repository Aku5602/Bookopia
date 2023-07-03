import React from 'react';
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const Students = lazy(() => import("./pages/StudentsPage"));
const Books = lazy(() => import("./pages/BooksPage"));

const App = () => {

  return (
    <>
      {/* App */}
      <Router>
        {/* Suspense along with Lazy Loading  */}
        <Suspense fallback={<h1 className='load'>Loading</h1>}>
          <Routes>
            {/* <Navbar/> */}
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/Students" element={<Students />}></Route>
            <Route path="/Books" element={<Books />}></Route>
          </Routes>
        </Suspense>
      </Router>

      
    </>
  );
};

export default App;
