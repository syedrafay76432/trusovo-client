// Footer.js
import React from "react";
import classes from "./Footer.module.css"; // Import your CSS module

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.left}>
        <p>2023 Trusovo, Inc</p>
      </div>
      <div className={classes.right}>
        <a href="\twitter.com" target="blank"><img className={classes.twitter} src="/twitter.jpg" alt="Logo" /></a>
        
      </div>
    </div>
  );
};

export default Footer;
