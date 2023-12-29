import React from "react";

import Card from "../UI/Card/Card";
import classes from "./Home.module.css";
import Button from "../UI/Button/Button";
// import AuthContext from "../../store/auth-context";

const Home = () => {
  // const ctx = useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <div className={classes.top}>
        <div className={classes.FirstHeading}>
          <h1 className={classes.h1}>
            Find world-class talent For Your business
          </h1>
          <Button>Download App now !</Button>
        </div>
        <img
          src="https://framerusercontent.com/images/yaMT8ErwNbNP5bZWg4bRvcj5o.png?scale-down-to=4096"
          alt=""
          width="750"
          height="650"
        />
      </div>
      <div>
        <h1 className={classes.h1}>Freelancing made Simple, fast and Secure</h1>
        <div className={classes.services}>
          <div>
            <img className={classes.images} src="/party.png" alt="" />
            <h2>Personalized Matching</h2>
            <p>
              We'll connect you with qualified talent based on your project,
              company stage and budget.
            </p>
          </div>
          <div>
            <img className={classes.images} src="/card.png" alt="" />
            <h2>Personalized Matching</h2>
            <p>
              We'll connect you with qualified talent based on your project,
              company stage and budget.
            </p>
          </div>
          <div>
            <img className={classes.images} src="/escrow.png" alt="" />
            <h2>Personalized Matching</h2>
            <p>
              We'll connect you with qualified talent based on your project,
              company stage and budget.
            </p>
          </div>
        </div>
      </div>
      <div className={classes.topHeading}>
        <div>
          <h1 className={classes.h1}>
            Get matched with projects that best align with your skillset.
          </h1>
          <p>
            Don't compete on price in a saturated talent pool. Spend less time
            selling and more time shipping.{" "}
          </p>
          <Button>Logout</Button>
        </div>
        <img className={classes.images} src="/lowestfee.png" alt="" />
      </div>
      <div className={classes.topHeading}>
        <img className={classes.images} src="/Handshake1.png" alt="" />
        <div>
          <h1 className={classes.h1}>
            Get matched with projects that best align with your skillset.
          </h1>
          <p>
            Don't compete on price in a saturated talent pool. Spend less time
            selling and more time shipping.{" "}
          </p>
          <Button>Logout</Button>
        </div>
      </div>
      <div className={classes.topHeading}>
        <div>
          <h1 className={classes.h1}>
            Get matched with projects that best align with your skillset.
          </h1>
          <p>
            Don't compete on price in a saturated talent pool. Spend less time
            selling and more time shipping.{" "}
          </p>
          <Button>Logout</Button>
        </div>
        <img className={classes.images} src="/escrow.png" alt="" />
      </div>
    </Card>
  );
};

export default Home;
