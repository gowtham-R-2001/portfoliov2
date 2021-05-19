import { useEffect } from "react";

function Home() {
    return (
        <div className="home">
            <div className="name-holder">
                <div> Hi </div>
                <div> I'm </div>
                <div> Gowtham </div>
                <div style={{fontSize: "1.2rem"}}> {"(Programmer, Web developer)"} </div>
            </div>

            <div className="social-media-holder">
                <a href="https://instagram.com/idz_mee_gowtham"> <i className="fa fa-instagram"></i> </a>
                <a href="https://telegram.me/gowtham_sonsadmin"> <i className="fa fa-telegram"></i> </a>
                <a href="https://mailto:gowthamcool4ever@gmail.com"> <i className="fa fa-envelope"></i> </a>
            </div>
        </div>
    );
}

export default Home;