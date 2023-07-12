import { useRef, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Auth from "./component/Auth";
import Chat from "./component/Chat";
import "./App.css";
import "./index.css";

function App() {
  const { isAuth, room, setRoom } = useContext(AuthContext);
  const roomInputRef = useRef(null);

  if (!isAuth) {
    return (
      <div className="App">
        <Auth />
      </div>
    );
  } else {
    return (
      <>
        {room ? (
          <Chat />
        ) : (
          <div>
            <label>Enter A Room Number</label>
            <input ref={roomInputRef} />
            <button onClick={() => setRoom(roomInputRef.current.value)}>
              Enter
            </button>
          </div>
        )}
      </>
    );
  }
}

export default App;
