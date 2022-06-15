import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialList from "./components/tutorials-list.component";


class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tutorials" className="navbar-brand">
            P. Nagendra babu
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={`/tutorials`} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                add
              </Link>
            </li>
          </div>
        </nav>
        {/* <TutorialList/> */}
        <div className="container mt-3">
          <Routes>
            <Route exact path="/" element={<TutorialList/>} />
            <Route  path= "/tutorials" element={<TutorialList/>}/>
            <Route  path="/add" element={<AddTutorial/>} />
            <Route path="/tutorials/:id" element={<Tutorial/>} />
          </Routes>
        </div>
      </div>
    );
  }
}
export default App;