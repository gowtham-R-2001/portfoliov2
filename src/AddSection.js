import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function AddSection(props) {
    const removeHandler = (e) => {
        let x = e.target;
        while(!x.getAttribute("class").includes("remove-btn"))
            x = x.parentNode;

        let removeBtns = document.querySelectorAll(".sections-holder .remove-btn");
        let arr = [];
        for(const btn of removeBtns) arr.push(btn);

        if(arr.includes(x)) {
            let index = arr.indexOf(x);
            document.querySelector(".sections-holder").childNodes[index].style.opacity = "0";
            setTimeout(() => {
                document.querySelector(".sections-holder").removeChild(document.querySelector(".sections-holder").childNodes[index]);
            }, 500);
        }
    }

    return (
        <div className="project-desc-holder-section">
            <TextField label="Sub-Heading" type="text" variant="outlined" className="project-desc-holder-heading" required />
            <TextField label="Description" type="text" variant="outlined" multiline rows={7} className="project-desc-holder-desc" required />
            <Button className="remove-btn" variant="contained" style={{background: "#cc0000", color: "#FFF"}} onClick={(e) => {
                removeHandler(e);
            }}>
                <i className="fa fa-trash"></i>
            </Button>
        </div>
    );
}

export default AddSection;