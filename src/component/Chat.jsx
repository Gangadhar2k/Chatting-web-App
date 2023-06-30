import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../Firebase-config";

function Chat({ room }) {
  const [text, setText] = useState("");

  const messageRef = collection(db, "Messages");
  const handelText = (e) => {
    setText(e.target.value);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (text !== "") {
      await addDoc(messageRef, {
        text,
        roomId: room,
        time: serverTimestamp(),
        name: auth.currentUser.displayName,
      });
      setText("");
    } else return;
  };
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <input
          placeholder="Enter your message"
          onChange={handelText}
          value={text}
        />
        <button type="Submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
