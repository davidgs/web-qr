import Card from "react-bootstrap/Card";
import logo from "../icons/64x64.png";
import "../css/sidebar.css";
import Userfront, { LogoutButton, LoginForm, SignupForm } from "@userfront/toolkit";
import { SessionResponse } from "@userfront/core";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

Userfront.init("qbjrr47b");
export default function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signup, setSignup] = useState(false);

  const enableSignup = () => {
    setSignup(!signup);
  }

  useEffect(() => {
  Userfront.getSession().then((session: SessionResponse) => {
    if (session) {
      console.log(`session`, session.isLoggedIn)
      setIsLoggedIn(session.isLoggedIn);
      return true;
    } else {
      return false;
    }
  })
    .catch((err) => {
      console.log(`err`, err)
      return false;
    }
  );
  }, []);

  return (
    <div className="main-column" style={{ height: "90%" }}>
      <Card className="bg-dark bs-text-custom">
        {/* <Card.Img variant="top" src={logo} alt="Card image" /> */}
        <Card.Body>
          <Card.Title className="bs-text-custom">
            Login to you account
          </Card.Title>
          <Card.Text>
            {isLoggedIn ? <LogoutButton>Logout</LogoutButton> : <></>}
            {signup ? <SignupForm style={{ borderRadius: "20px" }} />: <LoginForm />}
          </Card.Text>
          <Card.Text>
            Don't have an account yet? Signup here:
            <Button variant="primary" onClick={enableSignup}>{!signup ? "Sign Up" : "Login"}</Button>
          </Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
