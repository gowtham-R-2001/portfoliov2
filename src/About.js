import Axios from "axios";
import { useEffect, useState } from "react";
import ImageLoader from "./ImageLoader";

function About() {
    const [img, setImg] = useState("");

    useEffect(() => {
        Axios.post(`http://codeg.ezyro.com/portfoliov2-backend/getprofilepic.php`)
        .then((response) => {
            setImg(response.data);
        })
        .catch((err) => {
            console.log(err);
        })
    },[]);

    return(
        <div className="about">
            <div style={{position: "relative", top: "-20px"}}>
                <div className="heading"> {"ABOUT"} </div>
                <div className="sub-heading"> {"A SMALL INTRO"} </div>
            </div>

            <div className="about-img-holder">
                <ImageLoader src={img} style={{height: "100%", width: "100%"}} />
            </div>
            <div className="desc">
                I'am Gowtham. I am from Coimbatore. I am studying 3rd year 
                computer science engineering at sns college of engineering.
                I am an intermediate programmer and a good web developer.
                Good knowledge in c, c++, java, html, css, javascript, ReactJS, NodeJs, ExpressJs
                android development, python, php and mysqli.
            </div>
        </div>
    );
}

export default About;