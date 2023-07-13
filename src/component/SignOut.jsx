import { useContext } from "react";
import { auth } from "../Firebase-config";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import Cookie from "universal-cookie";
import IMG from "./icons8-logout-50.png";

const SignOut = () => {
  const { setRoom, setIsAuth } = useContext(AuthContext);
  var cookie = new Cookie();
  const handelSignOut = async () => {
    await signOut(auth);
    localStorage.removeItem("authToken");
    cookie.remove("auth-Token");
    setRoom(null);
    setIsAuth(false);
  };
  return (
    <button className="signout" onClick={handelSignOut}>
      <img src={IMG} alt="signout" />
    </button>
  );
};

export default SignOut;
