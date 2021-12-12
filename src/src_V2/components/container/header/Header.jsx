import {Link} from 'react-router-dom';
import NotificationsIcon from "@mui/icons-material/Notifications";

import CustomizedMenus from "./NavigationMenu";
import travelyIcon from "../../../assets/Travely.png";
import { ROUTES } from "../../../modules/manager/routes";
import "./style.css";


export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to={`../${ROUTES.DASHBOARD}`}>
          <img src={travelyIcon} width="150" alt="Travely" />
        </Link>
      </div>
      <div className="user">
        <NotificationsIcon className="notification" />
        <div>
          <CustomizedMenus />
        </div>
      </div>
    </header>
  );
}
