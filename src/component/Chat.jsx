import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../Firebase-config";

function Chat({ room }) {
  const [text, setText] = useState("");
  const [message, setMessage] = useState([]);

  const messageRef = collection(db, "Messages");
  const handelText = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("roomId", "==", room),
      orderBy("time")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessage(messages);
    });

    return () => unsubscribe();
  }, []);
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (text !== "") {
      await addDoc(messageRef, {
        text,
        roomId: room,
        time: serverTimestamp(),
        name: auth.currentUser.displayName,
        Image: auth.currentUser.photoURL,
      });

      setText("");
    } else return;
  };
  return (
    <div className="chat-display">
      <div className="chat-header">Welcome To {room}</div>
      <div>
        {message.map((message) => (
          <div className="chat">
            <h3>{message.text}</h3>
          </div>
        ))}
      </div>
      <form onSubmit={handelSubmit}>
        <input
          className="text-input"
          placeholder="Enter your message"
          onChange={handelText}
          value={text}
        />
        <button className="send-btn" type="Submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
