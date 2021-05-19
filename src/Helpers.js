export const replaceAll = (find, replace, str) => {
    while(str.includes(find)) {
        str = str.replace(find, replace);
    }
    return str;
}

export const capitalize = (str) => {
    let x = str.split(" ");
    str = "";
    for(let s of x) {
        str += s.substring(0,1).toUpperCase() + s.substring(1).toLowerCase() + " ";
    }
    return str.trim();
}

export const Loader = () => {
    return(
        <i className="fa fa-spinner spinner"></i>
    );
}

export const Error = (props) => {
    return(
        <div className="error" style={props.style}>
            <i style={{color: "#cc0000"}} className="fa fa-exclamation-triangle"></i>
            <span> {"Error Occurred :("} </span>
        </div>
    );
}

export const Slider = (type) => {
    let slider = document.querySelector(".slider");

    if(type === "hide") {
        try {
            setTimeout(() => {
                slider.style.transform = "translateX(120%)";
                setTimeout(() => {
                    slider.style.display = "none";
                    slider.style.transform = "translateX(-120%)";
                    setTimeout(() => slider.style.display = "flex", 1000);
                }, 1000);
            }, 1500);
        }
        catch(err) {}
    }
    else
    {
        try {
            slider.style.transform = "translateX(0)";
        }
        catch(err) {}
    }
}