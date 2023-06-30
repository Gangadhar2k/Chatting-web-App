import { useState, useRef } from "react";
import "./App.css";
import Auth from "./component/Auth";
import Chat from "./component/Chat";
import Cookie from "universal-cookie";
function App() {
  var cookie = new Cookie();

  const [isAuth, setIsAuth] = useState(cookie.get("auth-Token"));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);
  console.log(roomInputRef);

  // handeling room
  // const handelRoom = (e) => {
  //   setRoom(e.target.value);
  // };

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  } else {
    return (
      <div>
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
      </div>
    );
  }
}

export default App;
