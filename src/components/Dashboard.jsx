import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import IMDBIcon from "../assets/imdb_icon.png";
import Footer from "./Footer";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const checkToken = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    checkToken();
  }, []);
  return (
    <>
    <div className="dashboard-main-div">
      <div id="dashboard-navbar">
        <nav className="navbar navbar-expand-lg navbar-dark bg-black px-5">
          <div className="container-fluid">
            <NavLink to={"/"} className="navbar-brand">
              <img width={"50px"} src={IMDBIcon} alt="imdb_icon" />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#dashboardNavbar"
              aria-controls="#dashboardNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="dashboardNavbar">
              <ul className="navbar-nav me-auto mb-2 text-center  mb-lg-0 w-100 d-flex justify-content-end fs-5">
                <li className="nav-item">
                  <NavLink to="/">Movies</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/actors">Actors</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/producers">Producers</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink onClick={handleLogout} to="/login">
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Outlet />
    </div>
    <Footer />
    </>
  );
}

export default Dashboard;