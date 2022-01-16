import React from "react";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as FiIcons from "react-icons/fi";
import * as GrIcons from "react-icons/gr";
import "./Navbar.css";

export const sidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    className: "nav-text",
  },
  {
    title: "Hotels",
    path: "/hotel",
    icon: <GiIcons.GiHouseKeys />,
    className: "nav-text",
  },
  {
    title: "Luxury Houses",
    path: "/house",
    icon: <RiIcons.RiHome7Fill />,
    className: "nav-text",
  },
  {
    title: "About Me",
    path: "/about",
    icon: <BsIcons.BsInfoSquare />,
    className: "nav-text",
  },
  {
    title: "Contact",
    path: "/contact-us",
    icon: <BsIcons.BsFillTelephoneFill />,
    className: "nav-text",
  },
  {
    title: "Sign In",
    path: "/sign-in",
    icon: <FiIcons.FiLogIn />,
    className: "nav-text",
  },

  {
    title: "Sign Up",
    path: "/sign-up",
    icon: <BiIcons.BiUser />,
    className: "nav-text",
  },
];
