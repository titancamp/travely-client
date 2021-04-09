import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import GroupIcon from "@material-ui/icons/Group";
import Home from "./home/home";
import Tour from "./tour/tour";
import Guest from "./guest/guest";
import { Sidebar } from "../common/sidebar";
import { ContentArea } from "../common/content-area";

const pages = [
  {
    title: "Home",
    path: "/user/home",
    icon: <HomeIcon />,
    component: Home,
  },
  {
    title: "Guests",
    path: "/user/guest",
    icon: <GroupIcon />,
    component: Guest,
  },
  {
    title: "Tour",
    path: "/user/tour",
    icon: <WorkIcon />,
    component: Tour,
  },
];

export default function User() {
  return (
    <React.Fragment>
      <Sidebar pages={pages} />
      <ContentArea pages={pages} />
    </React.Fragment>
  );
}
