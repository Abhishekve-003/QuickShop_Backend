import React from "react";
import "./Footer.css";
import profile from "../../../images/profile.png";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Instagram from "@mui/icons-material/Instagram";


const Footer = () => {
    return (
        <div id="footer">
            <div className="leftFooter">
                <h3>DOWNLOAD OUR APP</h3>
                <p>Download App for Android and IOS mobile phones</p>
                <img src={profile} alt="profile" />
            </div>
            <div className="midFooter">
                <h1>QuickShop</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2023 &copy; QuickShop</p>
            </div>
            <div className="rightFooter">
                <h4>Contact Links</h4>
                <a href="https://www.linkedin.com/in/abhishekverma001/"><LinkedInIcon />LinkedIn</a>
                <a href="https://www.instagram.com/_abhishek_.verma._/"><Instagram/>Instagram</a>
            </div>
        </div>
    );
};

export default Footer;