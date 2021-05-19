import Axios from "axios";
import { useEffect, useState } from "react";
import { capitalize, Loader, replaceAll } from "./Helpers";
import ImageLoader from "./ImageLoader";
import { useParams, useHistory } from "react-router-dom";
import { Slider } from "./Helpers";

function ProjectDisplay() {
  const [domains, setDomains] = useState([]);
  const [projects, setProjects] = useState([]);
  const history = useHistory();
  let f = useParams().domain;
  const [filter, setFilter] = useState("java_domain");

  useEffect(() => {
    if (f && domains.length > 0) {
      domains.forEach((domain) => {
        if (domain.toLowerCase().includes(f.toLowerCase())) setFilter(domain);
      });
    }
  }, [domains]);

  useEffect(() => {
    Axios.post(`http://codeg.ezyro.com/portfoliov2-backend/getdomains.php`)
      .then((response) => {
        setDomains(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    Axios.post(
      `http://codeg.ezyro.com/portfoliov2-backend/getbasics.php/?domain=${filter}`
    )
      .then((response) => {
        setProjects(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filter]);

  return (
    <div className="project-display">
      <div className="project-sect-1">
        <div className="heading"> {"PROJECTS"} </div>
        <div className="sub-heading"> {"EXPLORE MY WORKS"} </div>
      </div>

      <div className="project-sect-2">
        <div className="filter-holder">
          <span className="prompt"> Show projects in </span>
          <select
            className="filter"
            value={filter}
            onChange={(e) => {
              history.push(
                `/works/${replaceAll(
                  "_domain",
                  "",
                  e.target.value
                ).toLowerCase()}`
              );
            }}
          >
            {domains.map((domain, key) => {
              return (
                <option key={key} value={domain}>
                  {" "}
                  {capitalize(
                    replaceAll("_", " ", replaceAll("_domain", " ", domain))
                  )}{" "}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="project-sect-3">
        {projects.length > 0 &&
          projects.map((project, key) => {
            return (
              <span
                style={{ color: "#000" }}
                onClick={() => {
                  Slider("show");
                  setTimeout(() => {
                    history.push(
                      `/works/project/${replaceAll(
                        "_",
                        " ",
                        replaceAll("_domain", "", filter)
                      ).toLowerCase()}/${project[0].toLowerCase()}`
                    );
                  }, 1000);
                }}
                key={key}
              >
                <div className="project-thumb" key={key}>
                  <ImageLoader
                    style={{ height: "90%", width: "100%" }}
                    src={project[1]}
                  />
                  <div className="prompt">
                    <div>
                      {" "}
                      Click here <br /> to view{" "}
                    </div>
                  </div>
                </div>
                <span>
                  {" "}
                  {capitalize(
                    replaceAll("_", " ", replaceAll("_domain", " ", project[0]))
                  )}{" "}
                </span>
              </span>
            );
          })}
        {!projects.length && <Loader />}
      </div>
    </div>
  );
}

export default ProjectDisplay;
