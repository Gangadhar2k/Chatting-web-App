// Auth.js
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth, provider } from "../Firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookie from "universal-cookie";

const Auth = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  var cookie = new Cookie();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setIsAuth(true);
    }
  }, []);

  const handelSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookie.set("auth-Token", result.user.refreshToken);
      localStorage.setItem("authToken", cookie.get("auth-Token"));
      setIsAuth(true);
    } catch (err) {
      return "Something Went Wrong...";
    }
  };

  return (
    <div className="signIn">
      <h3>SignIn To Continue</h3>
      <div class="google-btn" onClick={handelSignIn}>
        <div class="google-icon-wrapper">
          <img
            class="google-icon"
            src={
              "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            }
            alt="Auth"
          />
        </div>
        <p class="btn-text">
          <b>Sign in with google</b>
        </p>
      </div>
    </div>
  );
};

export default Auth;
