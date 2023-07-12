import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth, provider } from "../Firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookie from "universal-cookie";

const Auth = () => {
  const { setIsAuth } = useContext(AuthContext);
  var cookie = new Cookie();
  const handelSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookie.set("auth-Token", result.user.refreshToken);
      setIsAuth(cookie.get("auth-Token"));
    } catch (err) {
      return "Something Went Wrong...";
    }
  };

  return (
    <div className="signIn">
      <h3>Sign In With Google To Continue</h3>
      <button className="signIn-btn " onClick={handelSignIn}></button>
    </div>
  );
};

export default Auth;
