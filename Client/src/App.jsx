import "./App.css";
import "./componnents/Login/Login.jsx";
import { useState, createContext } from "react";
import Login from "./componnents/Login/Login.jsx";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import SignUp from "./componnents/SignUp/SignUp.jsx";
import Home from "./componnents/Home/Home.jsx";
import MyChildrensAlbums from "./componnents/Album/MyChildrensAlbums.jsx";
import MyAlbums from "./componnents/Album/MyAlbums.jsx";
import SingleAlbum from "./componnents/Album/SingleAlbum";
import MyChildren from "./componnents/Children/MyChildren";
import SingleChild from "./componnents/Children/SingleChild";
import SignUpChild from "./componnents/SignUp/SighUpChild.jsx";
import Cookies from "js-cookie";
import AllAlbums from "./componnents/Album/AllAlbums.jsx";
import HomePage from "./componnents/Home/HomePage";
export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(JSON.parse(Cookies.get("currentUser") || null));

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="signup">
              <Route index element={<SignUp />} />
              <Route path="child" element={<SignUpChild />} />
            </Route>
          </Route>
          {user && (
            <Route path=":username" element={<Home />}>
              <Route index element={<HomePage />}></Route>
              <Route path="home" element={<HomePage />} />
              <Route path="albums">
                <Route index element={<MyAlbums />} />
                <Route path=":albumId" element={<SingleAlbum />} />
              </Route>
              <Route path="mychildren'salbums">
                <Route index element={<MyChildrensAlbums />} />
                <Route path=":albumId" element={<SingleAlbum />} />
              </Route>
              <Route path="mychildren">
                <Route index element={<MyChildren />} />
                <Route path=":childName/albums" element={<SingleChild />}>
                  <Route index element={<AllAlbums />} />
                  <Route path=":albumId" element={<SingleAlbum />} />
                </Route>
              </Route>
            </Route>
          )}
          <Route path="/*" element={<p>page not found.
            <br />
            <Link to={user != null ? `/${user.username}/home` : "/"} className="link-button">Return {user != null ? "to Home" : ""}</Link>
          </p>} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
