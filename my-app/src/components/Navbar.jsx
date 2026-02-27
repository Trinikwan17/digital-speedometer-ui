import "./Navbar.css";
 import { IoMdSpeedometer } from "react-icons/io";
 import { BsBrightnessHigh } from "react-icons/bs";
 import {MdOutlineDarkMode} from "react-icons/md";
 function Navbar(props)
 {  
    return <div className={props.dabba? "dark-navbar": "navbar"}>
        <h1><IoMdSpeedometer/>speedotype</h1>
        <div className="nav-right">
            <p className="base-text">Best-Score:<span className="best-score">{localStorage.getItem("bestWpm")||0}</span></p>
            <button className="theme-toggle" onClick={props.changetheme}>{props.dabba? <BsBrightnessHigh/>:<MdOutlineDarkMode/>}</button>
        </div>
    </div>
 }
export default Navbar;