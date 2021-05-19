import "./App.scss";
import Navbar from "./Navbar";
import Home from "./Home";
import ProjectDisplay from "./ProjectDisplay";
import Project from "./Project";
import Contact from "./Contact";
import Admin from "./Admin";
import AdminProfile from "./AdminProfile";
import About from "./About";
import NotFound from "./NotFound";
import { useState, useEffect } from "react";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Context } from "./Context";

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let interval = setInterval(() => {
      if (document.querySelector(".div-2 div")) {
        document.querySelector(".div-2 div").addEventListener("scroll", (e) => {
          if (e.target.scrollTop > 0)
            document.querySelector(".div-1").style.backgroundColor = "#FFF";
          else
            document.querySelector(".div-1").style.backgroundColor =
              "transparent";
        });
        clearInterval(interval);
      }
    }, 1000);
  });

  return (
    <Context.Consumer>
      {(context) => {
        context.setIsLoggedIn = setIsLoggedIn;

        return (
          <div className="App">
              <div className="slider">
                <i className="fa fa-spinner"></i>
                <span className="loading"> Loading... </span>
              </div>
            <video className="bg" autoPlay loop>
              <source src="videoplayback.mp4" />
            </video>
            <div className="div-1">
              {" "}
              <Navbar />{" "}
            </div>
            <TransitionGroup>
              <CSSTransition
                timeout={1000}
                classNames="fade"
                key={location.pathname}
              >
                <div className="div-2">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/works" component={ProjectDisplay} />
                    <Route exact path="/about" component={About} />
                    <Route
                      exact
                      path="/works/:domain"
                      component={ProjectDisplay}
                    />
                    <Route exact path="/contact" component={Contact} />
                    <Route
                      exact
                      path="/works/project/:domain/:project"
                      component={Project}
                    />
                    <Route exact path="/adminprofile">
                      {isLoggedIn ? <AdminProfile /> : <Redirect to="/admin" />}
                    </Route>
                    <Route exact path="/admin">
                      {isLoggedIn ? <Redirect to="/adminprofile" /> : <Admin />}
                    </Route>
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </CSSTransition>
            </TransitionGroup>
          </div>
        );
      }}
    </Context.Consumer>
  );
}

export default App;
