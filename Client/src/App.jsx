import './App.css'
import './componnents/Login/Login.jsx'
import { createContext, useState } from 'react';
import Login from './componnents/Login/Login.jsx'
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(
    localStorage.getItem("currentUser") ? () => getUserDetails() : undefined
  );

  function getUserDetails() {
    /* let url =
       "http://localhost:3000/users/" +//////???????????????????????????/
       JSON.parse(localStorage.getItem("currentUser")).id;
     fetch(url)
       .then((response) => response.json())
       .then((responseJson) => {
         setUser(responseJson);
         return responseJson;
       });*/
  }

  return (

    <>
      <UserContext.Provider value={[user, setUser]}>
      <Login />
      </UserContext.Provider>
    </>
  )
}

export default App
