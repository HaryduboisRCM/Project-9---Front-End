import React , {useState} from "react";
import Dashboard from "./Dashboard";
import { ApiClient } from "./apiClient";
import Login from "./Login";

function App() {

  const [token,changeToken] = useState(window.localStorage.getItem("token"));

  const login = (newToken) => {
    window.localStorage.setItem("token",newToken)
    changeToken(newToken);
  }

  const logout = () => {
    window.localStorage.removeItem("token")
    changeToken(undefined);
  }
  const client = new ApiClient(token, logout);

  return (
    <>
      { token ? ( 
        <Dashboard client={client} />
      ): (
        <Login loggedIn={login} client={client} />
         )
      }  
    </>
  );
}

export default App;
