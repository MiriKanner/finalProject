import React, { useReducer, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
// import Info from "../components/Info";
import { useContext } from "react";
import { UserContext } from "../../App.jsx";
import "../../mycss.css";
import Cookies from "js-cookie";
function Home() {
  const [displaySideBar, setDisplaySideBar] = useState(false);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  let user = useContext(UserContext).user;
  useEffect(() => {
    if (user.username != params.username) navigate("/login");
  });
  function logOut() {
    const cookies = Object.keys(Cookies.get());
    cookies.forEach((cookie) => {
      Cookies.remove(cookie);
    });
    useContext(UserContext).setUser(null)
    //localStorage.removeItem("currentUser");
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
        <i
          className="material-icons"
          onClick={() => {
            setDisplaySideBar((prev) => !prev);
          }}
        >
          menu
        </i>{" "}
        <h3> Hello {user.username}</h3>{" "}
      </nav>
      <aside className={drawerClass.join(" ")}>
        <ul>
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
          <li onClick={()=>logOut()}>
            <i className="material-icons">table_chart</i>
            <span>Others</span>
          </li>
        </ul>
      </aside>
      <Outlet />
    </>

    //   <>
    //    <button className="btn-open" onClick={()=>setDisplaySideBar(!displaySideBar)}>{()=>{if(displaySideBar)return "☰ Open Sidebar";
    //    else return "Close Menu"}}
    //    </button>

    //  {displaySideBar&&
    //  <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: "280px"}}>
    //   <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
    //     <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"/></svg>
    //     <span className="fs-4">Sidebar</span>
    //   </Link>
    //   <hr/>
    //   <ul className="nav nav-pills flex-column mb-auto">
    //     <li className="nav-item">
    //       <Link to="#" className="nav-link active" aria-current="page">
    //         <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home"/></svg>
    //         Home
    //       </Link>
    //     </li>
    //     <li>
    //       <Link to="#" className="nav-link link-dark">
    //         <svg className="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2"/></svg>
    //         Dashboard
    //       </Link>
    //     </li>
    //     <li>
    //       <Link to="#" className="nav-link link-dark">
    //         <svg className="bi me-2" width="16" height="16"><use xlinkHref="#table"/></svg>
    //         Orders
    //       </Link>
    //     </li>
    //     <li>
    //       <Link to="#" className="nav-link link-dark">
    //         <svg className="bi me-2" width="16" height="16"><use xlinkHref="#grid"/></svg>
    //         Products
    //       </Link>
    //     </li>
    //     <li>
    //       <Link to="#" className="nav-link link-dark">
    //         <svg className="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"/></svg>
    //         Customers
    //       </Link>
    //     </li>
    //   </ul>
    //   <div className="dropdown">
    //     <Link to="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
    //       <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
    //       <strong>mdo</strong>
    //     </Link>
    //     <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
    //       <li><Link className="dropdown-item" to="#">New project...</Link></li>
    //       <li><Link className="dropdown-item" to="#">Settings</Link></li>
    //       <li><Link className="dropdown-item" to="#">Profile</Link></li>
    //       <li><hr className="dropdown-divider"/></li>
    //       <li><Link className="dropdown-item" to="#">Sign out</Link></li>
    //     </ul>
    //   </div>

    //     {/* <header>Hello {user.username}</header> */}
    //   </div>}
    //   <Outlet />
    //   </>
  );
}
export default Home;
