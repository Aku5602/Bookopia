import React, { useState } from 'react';
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Player, Controls } from '@lottiefiles/react-lottie-player';

const HomePage = lazy(() => import("./pages/HomePage"));
const Students = lazy(() => import("./pages/Students"));
const Books = lazy(() => import("./pages/Books"));

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
