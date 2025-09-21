import React from "react";

import logo from "../../../assets/Logo/logo.png.png";
import { Link } from "react-router";
const ProFastLogo = () => {
  return (
    <Link to="/">
      {" "}
      <div className="flex items-center">
        <img className="mb-3" src={logo} alt="" />
        <p className="text-3xl -ml-2 font-extrabold">Profast</p>
      </div>
    </Link>
  );
};

export default ProFastLogo;
