import React from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Home,
  Info,
  LogOut,
  Mail,
  Store,
  User,
  Wrench,
  Sun,
  Moon,
} from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100">
      {/* Menú desplegable en móvil */}

      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 22 22"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounde4-bo4 z-[0] mt-3 w-42 p-2 shadow"
          >
            <li className="flex items-left">
              <Link to="/" className="flex items-center">
                <Home className="h-4 w-4 ml-0" />
                Inicio
              </Link>
            </li>
            <li className="flex items-left">
              <Link to="/marketplace" className="flex items-center">
                <Store className="h-4 w-4 ml-0" />
                Marketplace
              </Link>
            </li>
            <li className="flex items-left">
              <Link to="/talleres-cercanos" className="flex items-center">
                <Wrench className="h-4 w-4 ml-0" />
                Talleres
              </Link>
            </li>
            <li className="flex items-left">
              <Link to="/Mensajes" className="flex items-center">
                <Mail className="h-4 w-4 ml-0" />
                Mensajes
              </Link>
            </li>
            <li className="flex items-left">
              <Link to="/Nosotros" className="flex items-center">
                <Info className="h-4 w-4 ml-0" />
                Nosotros
              </Link>
            </li>
          </ul>
        </div>
        {/* Botón de notificaciones */}
        <Link to="/Notificaciones">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <Bell className="h-5 w-5" />
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </Link>
      </div>
      {/* Logo central */}
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          MaxiAuto
        </Link>
      </div>

      {/* Iconos a la derecha */}
      <div className="navbar-end">
        {/*modonocturno*/}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller"
            value="synthwave"
          />

          {/* sol */}
          <svg className="swap-on h-10 w-10 fill-current" viewBox="0 -4 34 34">
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* luna */}
          <svg className="swap-off h-10 w-10 fill-current" viewBox="0 -4 34 34">
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
        {/* Botón de Perfil */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img src="https://i.imgur.com/bv4ulC3.jpeg" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounde4-bo4 z-[0] mt-3 w-42 p-2 shadow"
          >
            <li className="flex items-left">
              <Link to="/Perfil" className="flex items-center">
                <User className="h-4 w-4 ml-0" />
                Perfil
              </Link>
            </li>
            <li className="flex items-left">
              <a className="flex items-center">
                <LogOut className="h-4 w-4 ml-0" />
                Logout
              </a>
            </li>
            {/*falta logout(no es link a logout*/}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
