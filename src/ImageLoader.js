import { useState } from "react";

function ImageLoader(props) {
    const [showLoader, setShowLoader] = useState(true);

    return (
        <div className="img-holder" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <img id={props.id} style={props.style} className={props.className} src={props.src} onLoad={(e) => {
                let height = e.target.naturalHeight;
                let width = e.target.naturalWidth;
                let orientation = (width > height) ? "landscape" : "portrait";
                (orientation === "portrait") ? e.target.classList.add("portrait") : e.target.classList.add("landscape"); 
                setShowLoader(false)
            }} />
            {showLoader && <i className="fa fa-spinner spinner"></i>}
        </div>
    );
}

export default ImageLoader;