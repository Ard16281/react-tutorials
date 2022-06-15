import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class TutorialsList extends Component {
    constructor(props) {
    super(props);
   
    this.state = {
        tutorials: [],
        currentTutorial: null,
        currentIndex: -1,
        searchTitle: ""
    };

    }

    componentDidMount = () =>{
        this.retriveTutorials();
    }

    onChangeSearchTitle=(e)=> {
        console.log(`event `, e);
        const searchTitle = e.target.value;
        this.setState({
            searchTitle:searchTitle
        });
    }
    retriveTutorials= () => {
        TutorialDataService.getAll()
        .then(response => {
            this.setState({
                tutorials: response.data
            });
            console.log(response.data);
        })
        .catch (e => {
            console.log(e);
        });
    }
    refreshList=() => {
        this.retriveTutorials();
        this.setState({
            currentTutorial: null,
            currentIndiex: -1
        });
    }
    setActiveTutorial=(tutorial, index) => {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index
        });
    }
    removeAllTutorials=() => {
        TutorialDataService.deleteAll()
        .then(response => {
            console.log(response.data);
            this.refreshList();
        })
        .catch(e => {
            console.log(e);
        });
    }
    searchTitle=()=> {
        TutorialDataService.findByTitle(this.state.searchTitle)
        .then(response => {
            this.setState({
                tutorials:response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
     }
     render() {
        const { searchTitle,tutorials, currentTutorial, currentIndex }= this.state;
        return (
            <div className="lost row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                        type="text"
                        className="from-control"
                        placeholder="search by title"
                        value={searchTitle}
                        onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>

                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Tutorials List</h4>
                    <ul className="list-group">
                        {tutorials &&
                        tutorials.map((tutorial,index) => (
                            <li 
                            className={
                                "list-group-item"+
                                (index===currentIndex ? "active" : "")
                            }
                            onClick={() => this.setActiveTutorial(tutorial,index)}
                            key={index}
                            >
                                {tutorial.title}
                            </li>
                        
                        ))}
                    </ul>
                    <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={this.removeAllTutorials}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentTutorial ? (
                        <div>
                            <h4>Tutorial</h4>
                            <div>
                                <label>
                                    <strong>Title</strong>
                                </label>{""}
                                {currentTutorial.title}
                                
                            </div>
                            <div>
                                <label>
                                    <strong>Description</strong>
                                </label>{""}
                                {currentTutorial.description}
                            </div>
                            <div>
                                <label>
                                    <strong> Status:</strong>
                                </label>{""}
                               { currentTutorial.published ? "published" : "pending"}
                            </div>
                            <div>
                            <Link to={`/tutorials/${currentTutorial._id}`}  >
                            Edit
              </Link>
              </div>
                           
                            </div>
                    ) : (
                        <div>
                            <br />
                            <p>please click on a Tutorial...</p>
                        </div>
                     )}
                </div>

            </div>
        );
     }

}

export default TutorialsList