import React from 'react';
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("./routes/HomePage"));
const Students = lazy(() => import("./routes/StudentsPage"));
const Books = lazy(() => import("./routes/BooksPage"));

const App = () => {

  return (
    <>
      <Router>
        <Suspense fallback={<h1 className='load'>Loading</h1>}>
          <Routes>
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
