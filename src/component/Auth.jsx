import { auth, provider } from "../Firebase-config";

import { signInWithPopup } from "firebase/auth";

import Cookie from "universal-cookie";

const Auth = ({ setIsAuth }) => {
  var cookie = new Cookie();
  const handelSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookie.set("auth-Token", result.user.refreshToken);
      setIsAuth(cookie.get("auth-Token"));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      Sign In With Google To Continue
      <button onClick={handelSignIn}>Sign With Google</button>
    </div>
  );
};

export default Auth;
