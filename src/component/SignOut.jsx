import { useContext } from "react";
import { auth } from "../Firebase-config";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import Cookie from "universal-cookie";

const SignOut = () => {
  const { setRoom, setIsAuth } = useContext(AuthContext);
  var cookie = new Cookie();
  const handelSignOut = async () => {
    await signOut(auth);
    cookie.remove("auth-Token");
    setRoom(null);
    setIsAuth(false);
  };
  return <button onClick={handelSignOut}>Sign Out</button>;
};

export default SignOut;
