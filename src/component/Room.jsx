import { useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../index.css";

const Room = () => {
  const { setRoom } = useContext(AuthContext);
  const roomInputRef = useRef(null);
  return (
    <room className="Room-body">
      <div className="room">
        <input ref={roomInputRef} placeholder="ENTER A CODE" maxlength="10" />
        <button onClick={() => setRoom(roomInputRef.current.value)}>
          Let's Talk
        </button>
      </div>
    </room>
  );
};

export default Room;
