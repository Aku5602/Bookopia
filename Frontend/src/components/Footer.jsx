import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} LibraryManagementSystem. All rights
          reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
