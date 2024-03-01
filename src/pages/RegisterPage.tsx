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
import Userfront from "@userfront/core";
import React, { SyntheticEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  Userfront.init("xbp876mb");
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [showError, setShowError] = React.useState<boolean>(false);
  const [errorMessages, setErrorMessages] = React.useState<string[]>([]);
  const [passwordShown, setPasswordShown] = React.useState<boolean>(false);
  const [confPasswordShown, setConfPasswordShown] =
    React.useState<boolean>(false);
  const [passwd, setPasswd] = React.useState<string>("");
  const [passConfirm, setPassConfirm] = React.useState<string>("");
  const [validated, setValidated] = React.useState<boolean>(true);
  const toggle = () => {
    setPasswordShown(!passwordShown);
  };
  const confToggle = () => {
    setConfPasswordShown(!confPasswordShown);
  };
  Userfront.init("xbp876mb");

  const go = (dest: string) => {
    navigate(dest);
  };
  useEffect(() => {
    const loggedn = Userfront.getSession();
    loggedn.then((session) => {
      console.log(`Logged In: ${session.isLoggedIn}`);
      setLoggedIn(session.isLoggedIn);
      if (session.isLoggedIn) {
        go("/account");
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * generate a random 10-character password string
   * @returns
   */
  function generatePass() {
    let pass = "";
    const str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
      "abcdefghijklmnopqrstuvwxyz0123456789@#$-_&*!%?";
    for (let i = 1; i <= 10; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    return pass;
  }

  const valueChanged = (e: SyntheticEvent) => {
    const tar = e.target as HTMLInputElement;
    const form = e.currentTarget as HTMLFormElement;
    switch (tar.id) {
      case "firstName":
        setFirstName(tar.value);
        break;
      case "lastName":
        setLastName(tar.value);
        break;
      case "email":
        setEmail(tar.value);
        break;
      case "passwd":
        setPasswd(tar.value);
        break;
      case "passwdConfirm":
        setPassConfirm(tar.value);
        if (tar.value !== passwd) {
          tar.setCustomValidity("Passwords don't match");
        }
        break;
    }
    if (form.checkValidity() === false) {
      console.log("Form is invalid");
      e.preventDefault();
      e.stopPropagation();
      setValidated(false);
      return;
    }
    if (passwd !== passConfirm) {
      console.log("Passwords don't match");
      e.preventDefault();
      e.stopPropagation();
      setValidated(false);
      return;
    }

    setValidated(true);
    console.log("Form is valid");
  };
  const registerMe = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      console.log("Form is invalid");
      e.preventDefault();
      e.stopPropagation();
      setValidated(false);
      return;
    }
    const pass = generatePass();
    console.log("Registering user");
    console.log(
      `Registering ${firstName} ${lastName} with email ${email} and password ${pass}`
    );
    Userfront.signup({
      method: "password",
      email: email,
      password: pass,
      username: `${firstName}_${lastName}`,
      name: `${firstName} ${lastName}`,
    })
      .then((response) => {
        console.log("User registered", response);
      })
      .catch((error: Error) => {
        console.error("Registration failed", error);
        const em = [];
        em.push("Registration failed");
        em.push(error.message);
        setShowError(true);
        setErrorMessages(em);
      });
  };
  return (
    <div className={`main-column`}>
      <h1 style={{ textAlign: "center" }}>Register Page</h1>
    </div>
  );
}
