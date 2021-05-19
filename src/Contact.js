import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Axios from "axios";
import Swal from "sweetalert2"
import { useEffect } from 'react';

function Contact() {

    const sendHandler = () => {
        let name = document.querySelector("#name").value;
        let email = document.querySelector("#email").value;
        let msg = document.querySelector("#message").value;

        if(msg.length > 0 && name.length > 0 && email.length > 0)
        {
            let formdata = new FormData();
            formdata.append("name", name);
            formdata.append("email", email);
            formdata.append("msg", msg);
            Axios.post(`http://codeg.ezyro.com/portfoliov2-backend/contact.php`,formdata)
            .then((response) => {
                console.log(response.data.toLowerCase());
                if(response.data.toLowerCase() === "success")
                    Swal.fire("Message Sent", "Success <i style='color: #00FF00' class='fa fa-check-circle' />");
                else
                    Swal.fire("Network error :( Directly contact me at gowthamcool4ever@gmail.com", "Error <i style='color: #cc0000' class='fa fa-exclamation-triangle' />");
            })
            .catch((err) => {
                console.log(err);
                Swal.fire("Network error :( Directly contact me at gowthamcool4ever@gmail.com", "Error <i style='color: #cc0000' class='fa fa-exclamation-triangle' />");
            })
        }
    }

    return (
        <div className="contact">
            <div>
                <div className="heading"> CONTACT </div>
                <div className="sub-heading"> PLEASE WRITE YOUR FEEDBACKS </div>
            </div>

            <div className="contact-holder">
                <div className="name-email-holder">
                    <TextField label="Name" type="text" variant="outlined"  id="name" required />
                    <TextField label="Email" type="email" variant="outlined"  id="email" required />
                </div>
                <TextField id="message" label="Message" multiline rows={6} variant="outlined" />

                <Button variant="contained" onClick={() => sendHandler()} color="primary" id="send"> Send &nbsp;<i className="fa fa-send"></i> </Button>
            </div>
        </div>
    );
}

export default Contact;