import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Axios from "axios";
import { useEffect, useState } from "react";
import { capitalize, replaceAll, Error, Slider } from "./Helpers";
import ImageLoader from "./ImageLoader";
import { useParams } from "react-router-dom";

function Project() {
    const [project, setProject] = useState({});
    const [count, setCount] = useState(0);
    const [error, setError] = useState(false);
    const params = useParams();

    useEffect(() => {
        let obj = null;
        Axios.post(`http://codeg.ezyro.com/portfoliov2-backend/getproject.php?domain=${params.domain}_domain`)
        .then((response) => {
            console.log(response.data);
            let s = response.data.replace(/\\n/g, "\\n")  
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
            s = s.replace(/[\u0000-\u0019]+/g,"<br />"); // ↵
            obj = JSON.parse(s);
            return(Axios.post(`http://codeg.ezyro.com/portfoliov2-backend/getimages.php?project=${params.project}`));
        })
        .then((response) => {
            obj["images"] = response.data;
            setProject(obj);
            let interval = setInterval(() => {
                if(document.querySelector(".slider").style.transform && ((document.querySelector(".slider").style.transform) === ("translateX(-120%)")) === false) {
                    Slider("hide");
                    clearInterval(interval);
                }   
            },1000)
        })
        .catch(err => {/*console.log(err); */ setError(true)})
    },[]);

    useEffect(() => {
        if(document.querySelector(".main-desc")) {
            let content = replaceAll("&gt;",">",document.querySelector(".main-desc").innerHTML);
            content = replaceAll("&lt;","<",content);
            document.querySelector(".main-desc").innerHTML = content;
        }

        if(document.querySelector(".subs-desc")) {
            let content = replaceAll("&gt;",">",document.querySelectorAll(".subs-desc")[0].innerHTML);
            content = replaceAll("&lt;","<",content);
            document.querySelectorAll(".subs-desc")[0].innerHTML = content;
        }
    });

    return (
        <div className="project">
            {error && <Error style={{marginTop: "300px"}} />}
            <span className="cut-holder"> 
                <IconButton onClick={() => window.history.back()}> <span className="x">X</span> </IconButton>
            </span>
            {
                project.images && <div> 
                    <div className="project-images-holder">
                        <div className="project-images">
                            <ImageLoader src={project.images[count]} />
                        </div>
                    </div>
                    <div className="nav-holder">
                        <IconButton onClick={() => {if(count > 0) setCount(count-1)}}>
                            <i className="fa fa-arrow-left"> </i>
                        </IconButton>
                        <IconButton onClick={() => {if(count < project.images.length - 1) setCount(count+1)}}>
                            <i className="fa fa-arrow-right"> </i>
                        </IconButton>
                    </div>
                </div>
            }
            {
                project.headings && <div className="project-description">
                    {
                        project.weblink && <span className="subs" style={{border: "none", padding: "10px 0 0 0"}}>
                            <Button variant="contained" color="primary" onClick={() => window.open(project.weblink,"_self")}> Open Website </Button>
                        </span>
                    }
                    {
                        project.maindesc && <div className="subs">
                            <span className="main-desc"> {project.maindesc} </span>
                        </div>
                    }
                    {
                        project.headings.map((cont,key) => {
                            return (
                                <span className="subs" key={key}>
                                    <span className="subs-heading"> {capitalize(cont.heading)} </span>
                                    <span className="subs-desc"> {cont.desc} </span>
                                </span>
                            );
                        })
                    }
                </div>
            }
        </div>
    );
}

export default Project;