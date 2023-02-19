import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faRectangleXmark } from '@fortawesome/free-solid-svg-icons'
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import useLogout from "../hooks/useLogout";
import useAuth from '../hooks/useAuth';

import logo from '../img/PK2.png';

export default function Navbar() {

  const { auth } = useAuth();

  const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/login');
    }

    // console.log("aaaa", auth)

  return (
      <div className="navbar">
        <div className="site-title">
          <Link to="/" className="img-href">
            <img className="navbar-fit-picture"
              src={logo}
              alt="PK logo" />
          </Link>
        </div>

        <ul className="menu">
          <CustomLink to="/">Strona Główna</CustomLink>
          <CustomLink to="/plan">Rezerwuj</CustomLink>
          {auth.roles && auth.roles.find(role => (role == "9999" || role == "2002" || role == "2000")) ? <CustomLink to="/history">Historia</CustomLink>  : <></>}
          {auth.roles && auth.roles.find(role => (role == "9999" || role == "2002")) ? <CustomLink to="/admin">Zarządzaj</CustomLink> : <></>}
          {/* <CustomLink to="#" onClick={() => setVisible(!visible)}>Wyszukaj <FontAwesomeIcon icon={faSearch} /></CustomLink> */}

        </ul>
        <div className="login-section">
          {auth.userid ? <Link to="/login" onClick={signOut} className="login-btn">Wyloguj się</Link> : <Link to="/login" className="login-btn">Zaloguj się</Link>}
        </div>

      </div>

  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}