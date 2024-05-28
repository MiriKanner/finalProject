import "./App.css";

import "./componnents/Login/Login.jsx";
import { useState, createContext, useContext } from "react";
import Login from "./componnents/Login/Login.jsx";
export const UserContext = createContext(null);
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SignUp from "./componnents/SignUp/SignUp.jsx";
import Home from "./componnents/Home/Home.jsx";
import MyChildrensAlbums from "./componnents/Album/MyChildrensAlbums.jsx"
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
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/">
              <Route index element={<Login />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
            {user &&
              (<Route path=":username" element={<Home/>} >
                <Route index element={<Home />}></Route>
                <Route path="home" element={<Home />} />
                <Route path="mychildren'salbums" element={<MyChildrensAlbums/>}/>
              </Route>)
            }
            <Route path="/*" element={<p>not found</p>} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;

// {
//   user && (
//     <Route path="/home/users/:userId" element={<Home />}>
//       <Route path="info" element={<Info />} />
//       <Route path="albums">
//         <Route index element={<Albums />} />
//         <Route path="search/:field/:data" element={<Albums />} />
//         <Route path="search/:field/" element={<Albums />}></Route>
//         <Route path=":albumId" element={<SingleAlbum />}>
//           <Route path="photos" element={<Photos />}>
//             <Route path=":photoId" element={<Photos />} />
//           </Route>
//         </Route>
//       </Route>
//       <Route path="posts">
//         <Route index element={<Posts />} />
//         <Route path="search/:field/:data" element={<Posts />} />
//         <Route path="search/:field/" element={<Posts />}></Route>
//         <Route path=":postId" element={<SinglePost />}>
//           <Route path="comments" element={<Comments />}>
//             <Route path=":commentId" element={<SingleComment />} />
//           </Route>
//         </Route>
//       </Route>
//       <Route path="todos">
//         <Route index element={<Todos />} />
//         <Route path="search/:field/:data" element={<Todos />} />
//         <Route path="search/:field/" element={<Todos />}></Route>
//         <Route path=":todoId" element={<SingleTodo />}></Route>
//       </Route>
//     </Route>
//   );
// }
