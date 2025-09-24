import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import ProFastLogo from "../ProFastLogo/ProFastLogo";
import { AuthContext } from "../../../firebase/FirebaseAuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handelLogout = () => {
    logOut()
      .then((result) => {
        console.log(result);
        Swal.fire({
          title: "Logout Successfull!",
          icon: "success",
          draggable: true,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "btn bg-blue-600 text-white mr-2" : "btn mr-2"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/sendParcel"
          className={({ isActive }) =>
            isActive ? "btn bg-blue-600 text-white mr-2" : "btn mr-2"
          }
        >
          Send A Parcel
        </NavLink>
      </li>

      <li>
        {" "}
        <NavLink
          to="/aboutUs"
          className={({ isActive }) =>
            isActive ? "btn bg-blue-600 text-white mr-2" : "btn mr-2"
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        {" "}
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            isActive ? "btn bg-blue-600 text-white mr-2" : "btn mr-2"
          }
        >
          Coverage
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            {" "}
            <NavLink
              to="/dashbord"
              className={({ isActive }) =>
                isActive ? "btn bg-blue-600 text-white mr-2" : "btn mr-2"
              }
            >
              Dashbord
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <ProFastLogo></ProFastLogo>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="navbar-end gap-3">
            <img
              className="rounded-full h-10 w-10 border-2 border-green-600 shadow-md hover:scale-105 transition-transform duration-300"
              src={user?.photoURL}
              title={user?.displayName}
              alt="User Profile"
            />

            <h3 className="text-2xl font-bold">{user?.displayName}</h3>

            <button onClick={handelLogout} className="btn text-red-500">
              LogOut
            </button>
          </div>
        ) : (
          <div className="navbar-end">
            {" "}
            <Link to="/login" className="btn">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
