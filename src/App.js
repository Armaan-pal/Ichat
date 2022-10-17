import "./App.css";
import { useEffect, useState } from "react";
// import { getDatabase } from "firebase/database";
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
// import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function App() {
  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");

  const db = getDatabase();
  const chatListRef = ref(db, "chats");

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser({ name: result.user.displayName, email: result.user.email });
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const updateHeight = () => {
    const el = document.getElementById("chat");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      console.log(data.val())
      setChats((chats) => [...chats, data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 1000);
    });
    
  }, []);

  function sendChats() {
    setMsg("");

    // const db = getDatabase();
    const chatRef = push(chatListRef);
    set(chatRef, {
      user,
      message: msg,
    });
  }

  return (
    <div>
      {user.email ? null : (
        <div>
          {/* <input
            type="text"
            placeholder="enter you user"
            onBlur={(e) => setUser(e.target.value)}
          /> */}
          <button
          className="signin"
            onClick={(e) => {
              googleLogin();
            }}
          >
          Sign in
          </button>
        </div>
      )}
      {user.email ? (
        <div>
          <h3> user: {user.name}</h3>
          <div id="chat" className="chat-container">
            {chats.map((c, i) => (
              <div
                key={i}
                className={`container ${
                  c.user.email === user.email ? "me" : ""
                }`}
              >
                <p className="chatbox">
                  <strong>{c.user.name}:</strong>
                  <span>{c.message}</span>
                </p>
              </div>
            ))}
            <div className="btm">
              <input
                type="text"
                placeholder="message..."
                value={msg}
                onInput={(e) => setMsg(e.target.value)}
              ></input>
              <button onClick={sendChats}>send</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
