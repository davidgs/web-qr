/* The MIT License (MIT)
 *
 * Copyright (c) 2022-present David G. Simmons
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import Card from "react-bootstrap/Card";
import "../css/sidebar.css";
import Userfront, {
  LogoutButton,
  LoginForm,
  SignupForm,
} from "@userfront/toolkit";
import { SessionResponse } from "@userfront/core";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

Userfront.init("qbjrr47b");
export default function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signup, setSignup] = useState(false);

  const enableSignup = () => {
    setSignup(!signup);
  };

  useEffect(() => {
    Userfront.getSession()
      .then((session: SessionResponse) => {
        if (session) {
          console.log(`session`, session.isLoggedIn);
          setIsLoggedIn(session.isLoggedIn);
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(`err`, err);
        return false;
      });
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
            {signup ? (
              <SignupForm style={{ borderRadius: "20px" }} />
            ) : (
              <LoginForm />
            )}
          </Card.Text>
          <Card.Text>
            Don't have an account yet? Signup here:
            <Button variant="primary" onClick={enableSignup}>
              {!signup ? "Sign Up" : "Login"}
            </Button>
          </Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
