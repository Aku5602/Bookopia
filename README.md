<h1 align="center" style="color:#ADD8E6;">
  <br>
  <a href="https://college-management-project-23n2.vercel.app/"><img src="./Frontend/src/public/logo.gif" alt="Bookopia" width="200" height="200"></a></br>
  BOOKOPIA</br>Library Management System
</h1>


<p align="center">
  <a href="#features">Features</a> •
  <a href="#demonstration">Demonstration</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#api-design">API Design</a> •
  <a href="#production-deployment">Production Deployment</a> •
  <a href="#flowcharts">FlowCharts</a> •
  <a href="#color-reference">Color Reference</a> •
  <a href="#environment-setup">Environment Setup</a> •
  <a href="#run-locally">Run Locally</a> •
  <a href="#future-work">Future Work</a> •
  <a href="#folder-structure">Folder Structure</a> •
  <a href="#references">References</a> •
  <a href="#authors">Authors</a> •
  <a href="#acknowledgement">Acknowledgement</a> •
  <a href="#feedback">Feedback</a> •
  <a href="#contact-me">Contact Me</a> 
</p>


**B**ookopia is an exemplary web project that seamlessly combines advanced technologies, superior coding practices, and captivating design aesthetics to build a library management system. It is specially developed by Team [Dev Rookies]() for the [Afourathon](https://afourathon.com/) hackathon. Built using the MERN stack and incorporating cloud-based technologies such as Cloudinary and Multer, the system enables librarians to efficiently manage student and book records. It provides functionalities for adding, updating, and deleting student and book information, ensuring the persistence of data in the MongoDB Atlas database. With a user-friendly interface and seamless integration of various technologies, Bookopia offers librarians a reliable solution for streamlining library operations.

[Visit website](https://college-management-project-23n2.vercel.app/  "Checkout the hosted website")
•
[Visit documentation](https://sugamphirke.com/Projects/LMS/Team%20Dev%20Rookies.pdf  "Checkout the report")
•
[Visit presentation](https://www.youtube.com/watch?v=sItvQpeGKDY  "Checkout the video")

## Features

- Implementation of the 5-1 Sass Architecture.
- Utilization of the BEM model for class naming conventions.
- Construction based on Fluid Float Layouts and Flexbox.
- Integration of Responsive units for optimal adaptability.
- Adherence to the principles of color theory in its design, creating visually harmonious and engaging experiences.
- Provision for browsers that do not support specific styles, ensuring a consistent experience across different platforms.
- Built on the NPM ecosystem, leveraging the power of a vast collection of open-source packages and libraries.
- Codebase designed to be reusable, maintainable, and scalable, allowing for easy expansion and updates.
- Meticulously crafted using a Desktop-first approach, ensuring full responsiveness across various devices such as mobile phones, tablets (both in portrait and landscape orientations), and even larger screens.
- Operational Features :-
  #### Student Management:
  - Add, update, and delete student records.
  - Capture essential student details like name, ID number, email, and phone number.
  - Persistently store student information in the MongoDB Atlas database.
  #### Book Management:
  - Add, update, and delete book records.
  - Include book details such as title, author, description, and code.
  - Ensure the secure storage of book information in the MongoDB Atlas database.
  #### Lending Management:
  + Two distinct pages: Student Page and Book Page.
    - **Student Page:**
      - Select a student from a list and manage their borrowed books.
      - Perform actions like selecting, updating, and deleting books for a particular student.
    - **Book Page:**
      - Select a book from a list and manage the student who has borrowed it.
      - Perform actions like selecting, updating, and deleting the student associated with a book.
  #### Cloudinary and Multer Integration:
  - Efficiently handle image-related tasks and upload book covers & student photographs using Cloudinary.
  - Utilize Multer for seamless file uploading and management.
  #### MongoDB Atlas Integration:
  - Leverage the power of MongoDB Atlas to persistently store all student, book, and lending data securely.
  - Ensure data integrity and availability for reliable library operations.


## Demonstration

<img src="https://sugamphirke.com/Projects/LMS/img/bookopiaHomePage.png" height="300"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://sugamphirke.com/Projects/LMS/img/mobileView-homePage.jpg" height="300"> </br></br>
<img src="https://sugamphirke.com/Projects/LMS/img/studentPage.png" height="300"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://sugamphirke.com/Projects/LMS/img/mobileView-studentPage.jpg" height="300"> </br></br>
<img src="https://sugamphirke.com/Projects/LMS/img/studentPage-studentModal.png" height="300"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://sugamphirke.com/Projects/LMS/img/mobileView-studentPage-studentModal.jpg" height="300"> </br></br>
<img src="https://sugamphirke.com/Projects/LMS/img/studentPage-studentModal_addFunctionality.png" height="300"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://sugamphirke.com/Projects/LMS/img/mobileView-studentPage-studentModal_addFunctionality.jpg" height="300"> </br></br>
<img src="https://sugamphirke.com/Projects/LMS/img/studentPage_searchFunctionality.png" height="300"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://sugamphirke.com/Projects/LMS/img/mobileView-studentPage_searchFunctionality.jpg" height="300"> </br></br>
<img src="https://sugamphirke.com/Projects/LMS/img/noSearchFound.png" height="300"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://sugamphirke.com/Projects/LMS/img/mobileView-noSearchFound.jpg" height="300"> </br></br>
<img src="https://sugamphirke.com/Projects/LMS/img/studentPage-addStudentModal.png" height="300"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://sugamphirke.com/Projects/LMS/img/mobileView-studentPage-addStudentModal.jpg" height="300"> </br></br>
<img src="https://sugamphirke.com/Projects/LMS/img/bookPage.png" height="300"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://sugamphirke.com/Projects/LMS/img/mobileView-bookPage.jpg" height="300"> </br></br>
<img src="https://sugamphirke.com/Projects/LMS/img/bookpage-bookModal.png" height="300"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://sugamphirke.com/Projects/LMS/img/mobileView-bookpage-bookModal.jpg" height="300"> </br></br>
<img src="https://sugamphirke.com/Projects/LMS/img/bookpage-bookModal_addFunctionality.png" height="300"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://sugamphirke.com/Projects/LMS/img/mobileView-bookpage-addFunctionality.jpg" height="300"> </br></br>
<img src="https://sugamphirke.com/Projects/LMS/img/bookpage-bookModal_studentList.png" height="300"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://sugamphirke.com/Projects/LMS/img/mobileView-bookpage-bookModal_studentList.png.jpg" height="300"> </br></br>
<img src="https://sugamphirke.com/Projects/LMS/img/bookPage-addBookModal.png" height="300"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://sugamphirke.com/Projects/LMS/img/mobileView-bookPage-addBookModal.png.jpg" height="300"> </br></br>
<img src="https://sugamphirke.com/Projects/LMS/img/bookPage_searchFunctionality.png" height="300"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://sugamphirke.com/Projects/LMS/img/mobileView-bookPage_searchFunctionality.jpg" height="300">


## Tech Stack

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React.js (JSX)](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Cloudinary](https://cloudinary.com/)
- [Multer](https://www.npmjs.com/package/multer)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [Sass](https://sass-lang.com/)
- [CSS](https://www.w3.org/Style/CSS/Overview.en.html)
- [HTML](https://html.spec.whatwg.org/)


## API Design

**studentData.js**
- GET API "/studentData": To get data of all the students.
- GET API "/studentData/Available/:id": To get data of all the students who have not issued a book of particular id.
- POST API "/studentData": To post new student data to the database.
- PATCH API "/studentData": To edit student data present in the database.
- PATCH API "/studentData/BookInfo": To edit book data for a particular student.
- DELETE API "/studentData": To delete a student from the database.

**bookData.js**
- GET API "/bookData": To get data of all the books.
- GET API "/bookData/Available/:id": To get data of all the books not issued by a student of particular id.
- POST API "/bookData": To post new book data to the database.
- PATCH API "/bookData": To edit book data present in the database.
- DELETE API "/bookData/:no": To delete a book from the database.



## Production Deployment

Frontend: [Vercel](https://college-management-project-23n2.vercel.app/), PORT = 5173  
Backend: [Render](https://lms-backend-con7.onrender.com), PORT = 3001

[View Security Certificate](https://sugamphirke.com/Projects/LMS/_.vercel.app.crt)


## FlowCharts

<img src="https://sugamphirke.com/Projects/LMS/img/Frontend.jpg" width="600">
<img src="https://sugamphirke.com/Projects/LMS/img/Backend.jpg" width="600">
<img src="https://sugamphirke.com/Projects/LMS/img/DB.jpg" width="600">


## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Primary Color | ![#1E88E5](https://via.placeholder.com/10/1E88E5?text=+) #1E88E5 |
| Primary Color Light | ![#64B5F6](https://via.placeholder.com/10/64B5F6?text=+) #64B5F6 |
| Primary Color ExtraLight | ![#ADD8E6](https://via.placeholder.com/10/ADD8E6?text=+) #ADD8E6 |
| Primary Color Dark | ![#5643fa](https://via.placeholder.com/10/5643fa?text=+) #5643fa |
| Primary Color ExtraDark | ![#0000FF](https://via.placeholder.com/10/0000FF?text=+) #0000FF |
| Secondary Color Light | ![#F08080](https://via.placeholder.com/10/F08080?text=+) #F08080 |
| Secondary Color Dark | ![#FF0000](https://via.placeholder.com/10/FF0000?text=+) #FF0000 |
| Tertiary Color Light | ![#90EE90](https://via.placeholder.com/10/90EE90?text=+) #90EE90 |
| Tertiary Color Dark | ![#008000](https://via.placeholder.com/10/008000?text=+) #008000 |


## Environment Setup

- Download and install [Git](https://git-scm.com/downloads)
- Download and install [Node.js](https://nodejs.org/en/download)


## Run Locally

### Clone the project

```bash
  git clone https://github.com/Aku5602/Bookopia
```
Go to the Backend of project directory

```bash
  cd Bookopia/Backend
```

### Install dependencies and generate .env file

```bash
   npm install
   touch .env
```
In this .env file enter the following data:  
MONGO_URL = "//Paste Your Localhost MongoDB Atlas URL here// "  
PORT = 3001  
CLOUD_NAME = "//Enter your cloudinary cloud name"  
API_KEY = "//Enter your cloudinary api key"  
API_SECRET = "//Enter your api_secret key"


### Start the server

```bash
  npm run dev
```

### Go to the Frontend of the project directory

```bash
  cd Bookopia/Frontend
```

### Install dependencies and generate a .env file

```bash
   npm install
   touch .env
```
In this .env file enter the following data:  
VITE_BASE_URL = "http://localhost:3001/"

### Start the server

```bash
  npm run devserver
```
Go to http://localhost:5173 in any browser to see the application running.

### To build the final minified CSS file
```bash
  npm run build:css
```

## Folder Structure

- Backend:  

  <img src="https://sugamphirke.com/Projects/LMS/img/BackendFS.jpg" height="300">
- Frontend:  

  1.&nbsp;&nbsp;<img src="https://sugamphirke.com/Projects/LMS/img/FrontendFS1.jpg" height="300">&nbsp;&nbsp;&nbsp;&nbsp;
  2.&nbsp;&nbsp;<img src="https://sugamphirke.com/Projects/LMS/img/FrontendFS2.jpg" height="300">&nbsp;&nbsp;&nbsp;&nbsp;
  3.&nbsp;&nbsp;<img src="https://sugamphirke.com/Projects/LMS/img/FrontendFS3.jpg" height="300">&nbsp;&nbsp;&nbsp;&nbsp;
  
  4.&nbsp;&nbsp;<img src="https://sugamphirke.com/Projects/LMS/img/FrontendFS4.jpg" height="120">

## <span id="future-work">Future Work <span style="font-size: .9em;"> (as of 14-07-23)</span></span>

- Fine Managment
- Fixing Refresh link-breaking buManagementrrency
- Login & Signup Authentication
- Form validation
- Book recommendation
- Backup System
- Error handling & Testing
- Improve overall UX/UI and fix bugs
- And more!


## <span id="references">References(Tools, Docs & Webpacks)</span>

[Sass Guidelines](https://sass-guidelin.es/)  
[Sass 7-1 Architecture](https://kiranworkspace.com/sass-architecture/)  
[BEM Model](https://getbem.com/introduction/)  
[Statcounter](https://gs.statcounter.com/screen-resolution-stats)  
[Can I Use](https://caniuse.com/)  
[Sizzy](https://sizzy.co/)   
[Linea Icons](https://linea.io/)  
[Google fonts](https://fonts.google.com/)  
[Font Awesome](https://fontawesome.com/)  
[Coverr](https://coverr.co/)  
[Icons8](https://icons8.com/)  
[Unsplash](https://unsplash.com/)  
[MDN Docs](https://developer.mozilla.org/en-US/)  
[ReactJS Docs](https://react.dev/)  
[Polypane](https://polypane.app/)  
[LottieFiles](https://lottiefiles.com/)  
[Cloudinary](https://cloudinary.com/)  
[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)  
[MongoDB Compass](https://www.mongodb.com/products/compass)  
[Visual Studio Code](https://code.visualstudio.com/)  
[Google Chrome](https://www.google.com/chrome/)  
[Mozilla Firefox](https://www.mozilla.org/en-US/firefox/)  
[Microsoft Edge](https://www.microsoft.com/en-us/edge)  
[Safari](https://www.apple.com/in/safari/)  


## Authors
 <a href="https://www.github.com/sugamphirke016"><img src="https://sugamphirke.com/Projects/LMS/img/blue.png" height="80" alt="@sugamphirke016" /></a> &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/Aku5602"><img src="https://sugamphirke.com/Projects/LMS/img/author2-small.png" height="80" alt="@Aku5602" /></a> &nbsp;&nbsp;&nbsp;
  <a href="https://github.com/Bhushan56"><img src="https://sugamphirke.com/Projects/LMS/img/author1-small.png" height="80" alt="@Bhushan56" /></a>



## Acknowledgement
<img src="https://sugamphirke.com/Projects/LMS/img/afourtech.jpg" height="100">&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://sugamphirke.com/Projects/LMS/img/afourathon.jpg" height="100">&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://sugamphirke.com/Projects/LMS/img/pccoe-logo.jpg" height="100">


## Feedback

If you have any feedback, queries or suggestions, please reach out to me at projects@sugamphirke.com


## Contact Me

[![LinkedIn](https://sugamphirke.com/Projects/natours/accounts/images/linkedin-small.png)](http://www.linkedin.com/in/sugam-phirke)
[![LinkedIn](https://sugamphirke.com/Projects/natours/accounts/images/gmail-small.png)](https://mail.google.com/mail/?view=cm&to=reachout%40sugamphirke.com)
