import { useState, useRef } from "react";
import "./App.css";
import Auth from "./component/Auth";
import Chat from "./component/Chat";
import Cookie from "universal-cookie";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase-config";
import "./index.css";
function App() {
  var cookie = new Cookie();

  const [isAuth, setIsAuth] = useState(cookie.get("auth-Token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  const handelSignOut = async () => {
    await signOut(auth);
    cookie.remove("auth-Token");
    setRoom(null);
    setIsAuth(false);
  };

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  } else {
    return (
      <>
        {room ? (
          <Chat room={room} />
        ) : (
          <div>
            <label>Enter A Room Number</label>
            <input ref={roomInputRef} />
            <button onClick={() => setRoom(roomInputRef.current.value)}>
              Enter
            </button>
          </div>
        )}

        <div>
          <button onClick={handelSignOut}>Sign Out</button>
        </div>
      </>
    );
  }
}

export default App;
