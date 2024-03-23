import { jwtDecode } from "jwt-decode";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState({});
  function handleCallbackResponse(response) {
    setUser(jwtDecode(response.credential));
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "968408422808-i6ch6rd76oq3rrhid31e5316o01g2gkn.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <>
      <div id="signInDiv"></div>

      {user && (
        <div>
          <img src={user.picture} />
          <div>{user.name}</div>
          <div>{user.email}</div>
        </div>
      )}
      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>sign out</button>
      )}
    </>
  );
}

export default App;
