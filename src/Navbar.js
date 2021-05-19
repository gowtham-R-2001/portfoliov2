import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import { useEffect } from "react";

let pre = 0;

function Navbar() {
    const clickHandler = (num) => {
        document.querySelectorAll(".icon-holder")[pre].querySelector("i").style.color = "#000";
        document.querySelectorAll(".icon-holder")[num].querySelector("i").style.color = "#0077FF";
        pre = num;
    }

    useEffect(() => {
        try {
            let index = ["#/","#/works","#/about","#/contact"].indexOf(window.location.hash);
            document.querySelectorAll(".icon-holder")[index].querySelector("i").style.color = "#0077FF";
            pre = index;
        }
        catch(err){}
    },[]);

    return (
      <div className="navbar">
        <Link to="/" onClick={(e) => {clickHandler(0)}}>
            <IconButton className="icon-button">
                <div className="icon-holder">
                    <i className="fa fa-home"></i>
                    <span> Home </span>
                </div>
            </IconButton>
        </Link>

        <Link to="/works" onClick={(e) => {clickHandler(1)}}>
            <IconButton>
                <div className="icon-holder">
                    <i className="fa fa-graduation-cap"></i>
                    <span> Works </span>
                </div>
            </IconButton>
        </Link>

        <Link to="/about" onClick={(e) => {clickHandler(2)}}>
            <IconButton>
                <div className="icon-holder">
                    <i className="fa fa-user"></i>
                    <span> About </span>
                </div>
            </IconButton>
        </Link>

        <Link to="/contact" onClick={(e) => {clickHandler(3)}}>
            <IconButton>
                <div className="icon-holder">
                    <i className="fa fa-phone"></i>
                    <span> Contact </span>
                </div>
            </IconButton>
        </Link>
      </div>
    );
}

export default Navbar;