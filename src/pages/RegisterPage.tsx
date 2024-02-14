import React from "react";
import Userfront from "@userfront/core";
import { SignupForm } from "@userfront/toolkit";

export default function RegisterPage() {
  Userfront.init("qbjrr47b");

  return (
    <div className={`main-column`}>
      <h1 style={{ textAlign: "center" }}>Register Page</h1>
      <SignupForm />
    </div>
  );
}
