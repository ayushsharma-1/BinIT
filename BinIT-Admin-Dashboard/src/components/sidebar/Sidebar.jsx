import logo from "../../img/bssicon.png";
import "./Sidebar.scss";

import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import BadgeIcon from "@mui/icons-material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import TopicIcon from "@mui/icons-material/Topic";

import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <img src={logo} alt="Binit Services" className="logo" />
      </div>
      <div className="centre">
        <ul>
          <Link to="/dashboard">
            <li>
              <HomeIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/Reports">
            <li>
              <PeopleIcon className="icon" />
              <span>Report</span>
            </li>
          </Link>
          <Link to="/NGOdata">
            <li>
              <TopicIcon className="icon" />
              <span>NGO Data</span>
            </li>
          </Link>
          <Link to="/ContactUS">
            <li>
              <AssignmentLateIcon className="icon" />
              <span>Contact US</span>
            </li>
          </Link>
          <Link to="/MailSubscription">
            <li>
              <BadgeIcon className="icon" />
              <span>MailSubs</span>
            </li>
          </Link>
          <Link to="/logout">
            <li>
              <LogoutIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
