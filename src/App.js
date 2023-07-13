import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Auth from "./component/Auth";
import Chat from "./component/Chat";
import Room from "./component/Room";
import "./App.css";
import "./index.css";

function App() {
  const { isAuth, room } = useContext(AuthContext);

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
            <Room />
          </div>
        )}
      </>
    );
  }
}

export default App;
