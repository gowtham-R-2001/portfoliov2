import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Axios from "axios";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Context } from "./Context";

function Admin() {
    const [isUser, setIsUser] = useState(false);
    const context = useContext(Context);

    const loginHandler = () => {
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        if(username.length > 0 && password.length > 0)
        {
            Axios.post(`http://codeg.ezyro.com/portfoliov2-backend/login.php?username=${username}&password=${password}`)
            .then(response => {
                console.log(response.data.toLowerCase());
                if(response.data.toLowerCase() === "success") {
                    context.setIsLoggedIn(true);
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    return (
        <div className="admin">
            <section className="credentials">
                <span> Admin Login &nbsp;<i className="fa fa-key"></i> </span>
                <TextField label="Name" type="text" variant="outlined" id="username" required />
                <TextField label="Password" type="password" variant="outlined"  id="password" required />
                <Button variant="contained" color="primary" id="send" onClick={() => {loginHandler()}} > Login &nbsp;<i className="fa fa-user"></i> </Button>
            </section>
        </div>
    );
}

export default Admin;