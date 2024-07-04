import React from "react";
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/logo.png";
import {TiUser} from "react-icons/ti";
import {FaSearch} from "react-icons/fa";
import {IoIosCart} from "react-icons/io";

const Header = () => {
    return (
            <ReactNavbar  
                burgerColor="#eb4034" 
                burgerColorHover="#a62d24"
                logo={logo} 
                logoWidth="25rem"
                navColor1="white"
                logoHoverColor="#eb4034"
                link1Text="Home"
                link2Text="Products"
                link3Text="Contact"
                link4Text="About"
                link1Url="/"
                link2Url="/products"
                link3Url="/contact"
                link4Url="/about" 
                link1Size="3rem"
                link1Color="rgba(35,35,35,0.8)"
                nav1justifyContent="flex-end"
                nav2justifyContent="flex-end"
                nav3justifyContent="flex-start"
                nav4justifyContent="flex-start"
                link1ColorHover="#eb4034"
                link2ColorHover="#eb4034"
                link3ColorHover="#eb4034"
                link4ColorHover="#eb4034"
                link2Margin="1.6rem"
                link3Margin="0"
                link4Margin="1.6rem"
                searchIcon={true}
                SearchIconElement={FaSearch}
                searchIconColor="#eb4034"
                searchIconSize="4rem"
                searchIconColorHover="black"
                searchIconMargin="0.5rem"
                searchIconUrl="/search"
                cartIcon={true}
                CartIconElement={IoIosCart}
                cartIconColor="#eb4034"
                cartIconSize="4rem"
                cartIconColorHover="black"
                cartIconMargin="0.5rem"
                cartIconUrl="/cart"
                profileIcon={true}
                ProfileIconElement={TiUser}
                profileIconColor="#eb4034"
                profileIconSize="4rem"
                profileIconColorHover="black"
                profileIconMargin="0.5rem"
                profileIconUrl="/login"
             />  
    );
};


export default Header;