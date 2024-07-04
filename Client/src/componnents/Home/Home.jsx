import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../App.jsx";
import Cookies from "js-cookie";
import { IoMdLogOut } from "react-icons/io";
import { RiContactsBook2Fill } from "react-icons/ri";


function Home() {
  const [displaySideBar, setDisplaySideBar] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  let user = useContext(UserContext).user;
  let userContext = useContext(UserContext);

  useEffect(() => {
    if (user.username != params.username) logOut();
  });

  function logOut() {
    const cookies = Object.keys(Cookies.get());
    cookies.forEach((cookie) => {
      Cookies.remove(cookie);
    });
    userContext.setUser(null)
    navigate("/login");
  }

  let drawerClass = [];
  if (displaySideBar) {
    drawerClass.push("drawerOpen");
  } else {
    drawerClass.push("drawerMin");
  }

  return (
    <>
      <nav className="sticky">
        {" "}
        <i className="material-icons"
          onClick={() => setDisplaySideBar((prev) => !prev)}>
          menu
        </i>{" "}
        <h5> {user.username}</h5>{" "}
      </nav>
      <aside className={drawerClass.join(" ")}>
        <ul>
          <li className="help-li" />
          <Link to={"/"+ user.username + "/home"}>
            <li>
              <i className="material-icons">home</i>
              <span>home</span>
            </li>
          </Link>
          <Link to={"/" + user.username + "/mychildren'salbums"}>
            <li>
              <i className="material-icons">burst_mode</i>
              <span>My Children's Album</span>
            </li>
          </Link>
          <Link to={"/" + user.username + "/mychildren"}>
            {" "}
            <li>
              <i className="material-icons">people</i>
              <span>My Children</span>
            </li>
          </Link>
          <Link to={"/" + user.username + "/albums"}>
            <li>
              <i><RiContactsBook2Fill size={31} /></i>
              <span>My Albums</span>
            </li>
          </Link>
          <li onClick={() => logOut()}>
            <i> <IoMdLogOut size={31} /></i>
            <span>Log out</span>
          </li>
        </ul>
      </aside>
      <Outlet />
    </>
  );
}
export default Home;
