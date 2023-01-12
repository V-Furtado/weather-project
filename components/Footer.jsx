import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div
      className="footer"
      style={{ width: "100%" }}
    >
      {/* © 2022 Copyright: */}
      <p>Copyright &copy; {currentYear} Vanderley Furtado. All rights reserved.</p>
    </div>
  );
};

export default Footer;