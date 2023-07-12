import React, { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

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
import SignOut from "./SignOut";

function Chat() {
  const { room } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [message, setMessage] = useState([]);
  const chatContainerRef = useRef(null);
  const lastMessageRef = useRef(null);

  const messageRef = collection(db, "Messages");
  const handleText = (e) => {
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

      const chatDisplay = document.getElementById("chat-display");
      chatDisplay.scrollTop = chatDisplay.scrollHeight;
      setMessage(messages);
      scrollToBottom(); // Scroll to the bottom after new messages are added
    });

    return () => unsubscribe();
  }, [room]);

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  const handleSubmit = async (e) => {
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
    <div className="chat-display" id="chat-display" ref={chatContainerRef}>
      <div className="chat-header">
        Welcome To {room} <SignOut />
      </div>
      <div>
        {message.map((message, index) => (
          <div
            className={`chat-${
              auth.currentUser.displayName === message.name ? true : false
            }`}
            key={message.id}
          >
            <p ref={index === message.length - 1 ? lastMessageRef : null}>
              {message.text}
            </p>
          </div>
        ))}
        <div ref={lastMessageRef} /> {/* Empty div as a target for scrolling */}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="text-input"
          placeholder="Enter your message"
          onChange={handleText}
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
