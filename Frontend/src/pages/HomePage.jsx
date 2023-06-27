// import React from 'react'
import "../styles/HomePage.css";
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import {Link} from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <div className="HomeContainer">
        <div className="HomeContainer__logo">
          <Player
            src="https://assets1.lottiefiles.com/packages/lf20_1a8dx7zj.json"
            background="transparent"
            speed="1"
            style={{"width": "600px", "height": "600px"}}
            loop
            autoplay
          ></Player>
        </div>
        <main className="content">
      
          <Player
            className="content__logo"
            src="https://assets1.lottiefiles.com/packages/lf20_som9ibse.json"
            background="transparent"
            speed="1"
            style={{"width": "300px", "height": "300px"}}
            loop
            autoplay
          ></Player>
          <h1 className="content__heading">
            <span className="content__heading--primary">Library</span>
            <span className="content__heading--secondary">
              Management System
            </span>
          </h1>
          <div className="HomePagebtn">
            <Link to="/Students" className="content__btn content__btn--students">
              Manage <span className="break">Students</span>
            </Link>
            <Link to="/Books" className="content__btn content__btn--books">
              Manage <span className="break">Books</span>
            </Link>
          </div>

          <p className="copyright">&copy; All rights reserved. 2023-24.</p>
        </main>
      </div>
    </>
  );
};

export default HomePage;
