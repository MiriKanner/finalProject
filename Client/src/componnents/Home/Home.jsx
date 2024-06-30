import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
// import Info from "../components/Info";
import { UserContext } from "../../App.jsx";
import "../../mycss.css";
import Cookies from "js-cookie";

function Home() {
  const [displaySideBar, setDisplaySideBar] = useState(false);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  let user = useContext(UserContext).user;
  let user2 = useContext(UserContext)
  useEffect(() => {
    if (user.username != params.username) logOut();
  });
  function logOut() {
    const cookies = Object.keys(Cookies.get());
    cookies.forEach((cookie) => {
      Cookies.remove(cookie);
    });
    user2.setUser(null)
    navigate("/login");
  }

  let drawerClass = [];
  if (displaySideBar) {
    drawerClass.push("drawerOpen");
    //mainClass.push("mainMin")
  } else {
    drawerClass.push("drawerMin");
    //  mainClass.push("mainOpen");
  }

  return (
    <>
      <nav className="sticky">
        {" "}
        <i className="material-icons"
          onClick={() => setDisplaySideBar((prev) => !prev)}>
          menu
        </i>{" "}
        <h3> Hello {user.username}</h3>{" "}
      </nav>
      <aside className={drawerClass.join(" ")}>
        <ul>
          <li className="help-li" />
          {/* <img className="imgInHome" src="../../../images/צילום מסך 2024-06-26 012458.png" /> */}
          <Link to={"/" + user.username + "/mychildren'salbums"}>
            <li>
              <i className="material-icons">dashboard</i>
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
              <i className="material-icons">show_chart</i>
              <span>My Albums</span>
            </li>
          </Link>
          <li onClick={() => logOut()}>
            <i className="material-icons">table_chart</i>
            <span>Log out</span>
          </li>
        </ul>
      </aside>
      <Outlet />
    </>
  );
}
export default Home;
