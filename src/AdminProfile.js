import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useEffect, useState, useContext } from 'react';
import Axios from "axios";
import Swal from "sweetalert2";
import AddSection from "./AddSection";
import ReactDOM from "react-dom";
import { replaceAll, capitalize } from "./Helpers";
import ImageLoader from "./ImageLoader";


function AdminProfile() {
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [domains, setDomains] = useState([]);
    const [addDomainShow, setAddDomainShow] = useState(false);
    const [addProfileImage, setAddProfileImage] = useState(false);

    useEffect(() => {
        Axios.post(`http://codeg.ezyro.com/portfoliov2-backend/getdomains.php`)
        .then(response => {setDomains(response.data);})
        .catch(err => {console.log(err)})
    },[addDomainShow]);


    const generateLink = (file) => {
        return(new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = () => {resolve(reader.result)};
            reader.readAsDataURL(file);
        }));
    }

    const AddProfileImage = () => {
        let image = null;
        return (
            <div className="add-profile-pic">
                <Button variant="contained" color="primary" id="upload-image" onClick={() => document.querySelector("#file").click()}> Upload Profile Image &nbsp;<i className="fa fa-upload"></i> 
                    <input type="file" accept="image/*" id="file" hidden onChange={async (e) => {
                        image = await generateLink(e.target.files[0]);
                        document.querySelector("#my-image").setAttribute("src",image);
                    }} />
                </Button>
                <ImageLoader id="my-image" />
                <Button variant="contained" color="secondary" onClick={() => {
                    let formdata = new FormData();
                    formdata.append("imagelink", image);
                    Axios.post(`http://codeg.ezyro.com/portfoliov2-backend/uploadprofilepic.php`, formdata)
                    .then((response) => {
                        Swal.fire("Profile Updated", "Success <i style='color: #00FF00' class='fa fa-check-circle' />");
                    })
                    .catch((err) => {
                        Swal.fire("Error Occurred :( ", "Error <i style='color: #cc0000' class='fa fa-exclamation-triangle' />");
                        console.log(err);
                    })
                }}> 
                    Upload to DB&nbsp;<i className="fa fa-upload"></i> 
                </Button>
            </div>
        );
    }

    const uploadToDBHandler = (obj) => {
        let projectName = document.querySelector('#project-name').value;
        let websiteLink = document.querySelector('#website-link').value;
        let projectDesc = document.querySelector('#project-desc').value;
        let domain = document.querySelector('.filter').value;

        if(projectName.length > 0 && projectDesc.length > 0 && images.length > 0) 
        {
            setIsLoading(true);
            console.log(JSON.stringify(obj));
            let formdata = new FormData();
            formdata.append("projectname", projectName);
            formdata.append("projectdesc", replaceAll("\'","\\'",JSON.stringify(obj)));
            formdata.append("weblink", websiteLink);
            formdata.append("domain", domain);

            Axios.post("http://codeg.ezyro.com/portfoliov2-backend/uploadproject.php", formdata)
            .then(response => {
                if(response.data.toLowerCase() === "success") {
                    return(new Promise(async(resolve, reject) => {
                        for(let i = 0; i < images.length; i++) {
                            formdata = new FormData();
                            formdata.append("imagelink",images[i]);
                            formdata.append("projectname",projectName);
                            let imageRes = await Axios.post("http://codeg.ezyro.com/portfoliov2-backend/insertimages.php", formdata);
                            if(i == images.length - 1)
                                resolve();
                        }
                    }));
                }
                else {
                    console.log(response.data);
                    Swal.fire(response.data,'error');
                    throw response.data;
                }
            })
            .then(() => {
                console.log("Everything Done");
                Swal.fire("Project Inserted Success", 'success');
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                Swal.fire(err,'error');
                setIsLoading(false);
            });
        }
    }

    const uploadHandler = async(e) => {
        setIsLoading(true);
        let screenshotNames = document.querySelector(".screenshot-names");
        screenshotNames.innerHTML = null;
        let arr = [];

        for(let i = 0; i < e.target.files.length; i++) {
            let link = await generateLink(e.target.files[i])
            let img = document.createElement('img'); img.src = link;
            let span = document.createElement('span'); span.textContent = e.target.files[i].name;
            let div = document.createElement('div');
            div.setAttribute("class", "image-details-holder");
            div.appendChild(img); div.appendChild(span);
            screenshotNames.appendChild(div);
            arr.push(link);

            if(i === e.target.files.length - 1) {
                setImages(arr);
                setIsLoading(false);
                document.querySelector(".screenshot-names-count").innerHTML = `Total images : ${e.target.files.length}`;
                screenshotNames.style.paddingLeft = `${e.target.files.length}%`;
            }
        }
    }

    const AddDomain = () => {
        return (
            <div className="add-domain">
                <div className="add-domain-holder">
                    <TextField label="Domain name" type="text" variant="outlined" id="add-domain-name" required />
                    <Button onClick={() => {
                        let addDomainName = document.querySelector("#add-domain-name");
                        let domainName = replaceAll(" ","_",addDomainName.value);
                        if(addDomainName.value.length > 0)
                            Axios.post(`http://codeg.ezyro.com/portfoliov2-backend/adddomain.php?domainname=${domainName+"_domain"}`)
                            .then(response => {
                                console.log(response.data);
                                if(response.data.toLowerCase() === "success" )
                                    Swal.fire("Domain Added", 'success');
                                else
                                    Swal.fire("Cannot Add domain", 'error');
                            })
                            .catch(err => Swal.fire("Error Adding domain", 'error'));
                    }} variant="contained" color="primary" id="add-domain-btn"> Add domain  </Button>
                </div>
                <div className="add-domain-result"></div>
                <Button variant="contained" color="primary" onClick={() => {setAddDomainShow(false)}}> Go Back </Button>
            </div>
        );
    }


    const generateJSON = () => {
        let projectName = document.querySelector("#project-name").value;
        let weblink = document.querySelector("#website-link").value;
        let sectionsHolder = document.querySelector(".sections-holder");
        let projectDesc = document.querySelector("#project-desc");
        let obj = {};

        obj["projectName"] = projectName;
        obj["weblink"] = weblink;
        obj["headings"] = [];

        let sectionHeadings = sectionsHolder.querySelectorAll(".project-desc-holder-heading input");
        let sectionDescs = sectionsHolder.querySelectorAll(".project-desc-holder-desc textarea");

        for(let i = 0; i < sectionHeadings.length; i++)
           obj["headings"].push({heading: sectionHeadings[i].value, desc: sectionDescs[i].value});

        obj["maindesc"] = projectDesc.value;
        return(obj);
    }


    return (
        <div className="admin-profile">
            {isLoading && <div className="load-holder"> <i className="fa fa-spinner"></i> </div> }
            {addProfileImage && <AddProfileImage />}
            {addDomainShow && <AddDomain />}
            {
                !addDomainShow && !addProfileImage &&
                <>
                    <div className="choose-or-add-domain">
                        <div> <Button variant="contained" color="secondary" onClick={() => setAddProfileImage(true)} > Add Profile Pic </Button> </div>
                        <div> <Button onClick={() => setAddDomainShow(true)} variant="contained" color="primary" id="upload"> Add domain </Button> &nbsp; OR </div>
                        <div className="filter-holder">
                            <div className="prompt"> {"Choose domain"} </div>
                            <select className="filter">
                                {
                                    domains.map((domain,key) => {
                                        return(<option value={domain} key={key}> {capitalize(replaceAll("_"," ",domain.replace("domain","")))}</option>);
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <div className="upload-holder">
                        <div className="name-upload-holder">
                            <TextField label="Project name" type="text" variant="outlined" id="project-name" required />
                        </div>
                        <Button variant="contained" color="primary" id="upload-image" onClick={() => document.querySelector("#file").click()}> Upload Screenshots &nbsp;<i className="fa fa-upload"></i> 
                            <input type="file" accept="image/*" id="file" hidden multiple onChange={(e) => uploadHandler(e)} />
                        </Button>
                        <TextField label="Add Website link" type="text" variant="outlined"  id="website-link" required />
                        <div>
                            <div className="screenshot-names"> </div>
                            <div className="screenshot-names-count" style={{marginTop: "10px"}}></div>
                        </div>
                        <div className="project-desc-holder">
                            <div className="dummy-node"></div>
                            <div className="sections-holder"></div>
                            <Button variant="contained" color="secondary" onClick={(e) => {
                                let dom = document.createElement("div");
                                ReactDOM.render(<AddSection />, dom);
                                document.querySelector(".sections-holder").appendChild(dom);
                            }}>
                                Add Section&nbsp; <i className="fa fa-plus"></i>
                            </Button>
                            <TextField id="project-desc" label="Project Description" multiline rows={20} variant="outlined" required />
                        </div>
                        <Button onClick={() => {let obj = generateJSON(); uploadToDBHandler(obj); }} variant="contained" color="primary" id="upload"> Store in DB &nbsp;<i className="fa fa-upload"></i>  </Button>
                    </div>
                </>
            }
        </div>
    );
}

export default AdminProfile;