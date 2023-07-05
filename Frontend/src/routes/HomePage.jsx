import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <div className="homePageContainer">
        <div className="homePageContainer__animationScreen1">
          <Player
            src="https://assets1.lottiefiles.com/packages/lf20_1a8dx7zj.json"
            background="transparent"
            speed="1"
            style={{ "width": "600px", "height": "600px" }}
            loop
            autoplay
          ></Player>
        </div>

        <main className="content">
          <div className="content_company">
            <Player
              className="content__logo"
              src="https://assets1.lottiefiles.com/packages/lf20_som9ibse.json"
              background="transparent"
              speed="1"
              style={{ "width": "300px", "height": "300px" }}
              loop
              autoplay
            ></Player>
            <h1 className="content__heading">
              <span className="content__heading--primary">
                Library
              </span>
              <span className="content__heading--secondary">
                Management System
              </span>
            </h1>
          </div>
          <div className="content__btnsContainer">
            <Link to="/Students" className="content__btn content__btn--students">
              Manage <span className="content__buttonText">Students</span>
            </Link>
            <Link to="/Books" className="content__btn content__btn--books">
              Manage <span className="content__buttonText">Books</span>
            </Link>
          </div>

          <p className="content__copyright">&copy; All rights reserved. 2023-24.</p>
        </main>
      </div>
    </>
  );
};

export default HomePage;
