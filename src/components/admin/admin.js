import React from "react";

import ApartmentIcon from "@material-ui/icons/Apartment";
import GroupIcon from "@material-ui/icons/Group";
import HotelIcon from "@material-ui/icons/Hotel";
import LockIcon from "@material-ui/icons/Lock";
import PublicIcon from "@material-ui/icons/Public";

import AgencyProfile from "./agency/agency-profile";
import ManageStaff from "./staff/manage-staff";
import ManageHotels from "./hotels/manage-hotels";
import ManageActivities from "./activities/manage-activities";
import ChangePassword from "./account/change-password";
import {ContentArea} from "../common/content-area";
import {Sidebar} from "../common/sidebar";
import NotificationPane from "../common/notification-pane";
import {SnackbarProvider} from "notistack";

const pages = [
    {
        title: "Agency Profile",
        path: "/admin/profile",
        icon: <ApartmentIcon/>,
        component: AgencyProfile,
    },
    {
        title: "Manage Staff",
        path: "/admin/staff",
        icon: <GroupIcon/>,
        component: ManageStaff,
    },
    {
        title: "Manage Hotels",
        path: "/admin/hotels",
        icon: <HotelIcon/>,
        component: ManageHotels,
    },
    {
        title: "Manage Activities",
        path: "/admin/activities",
        icon: <PublicIcon/>,
        component: ManageActivities,
    },
    {
        title: "Change Password",
        path: "/admin/password",
        icon: <LockIcon/>,
        component: ChangePassword,
    },
];

export default function Admin() {
    return (
        <React.Fragment>
            <SnackbarProvider maxSnack={1000}>
                <NotificationPane/>
                <Sidebar pages={pages}/>
                <ContentArea pages={pages}/>
            </SnackbarProvider>
        </React.Fragment>
    );
}
