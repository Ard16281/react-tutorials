import { FOCUSABLE_SELECTOR } from "@testing-library/user-event/dist/utils";
import React,{ Component } from "react";
import TutorialDataService from "../services/tutorial.service";
export default class AddTutorial extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id: null,
            title: "",
            description: "",
            published: false,
            submited: false
        };
    }
        onChangeTitle=(e) =>{
            this.setState({
                title: e.target.value
            });
         }
         onChangeDescription=(e) => {
            this.setState({
              description: e.target.value
            });
          }
         saveTutorial=() =>{
            var data= {
                title:this.state.title,
                description: this.state.description
            };
            TutorialDataService.create(data)
            .then(response => {
            this.setState({
                id:response.data.id,
                title:response.data.title,
                description: response.data.description,
                published: response.data.published,
                submitted:true
            });
            console.log(response.data);
        })
            .catch(e => {
                console.log(e);
            });

            
         }
         newTutorial=()=> {
            this.setState({
            id: null,
            title: "",
            description: "",
            published: false,
            submitted: false
            });
         }
         
            
            render(){
                return (
                    <div className= "submit.form">
                    {this.state.sbmitted ? (
                        <div>
                            <h4>you submitted successfully!</h4>
                            <button className="btn btn-sucess" onClick={this.newTutorial}>
                                Add
                            </button>
                            
                        </div>
                    ) : (
                        <div>
                        <div className="form-group">
                          <label htmlFor="title">Title</label>
                          <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={this.state.title}
                            onChange={this.onChangeTitle}
                            name="title"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            name="description"
                          />
                            </div>
                            <button onClick={this.saveTutorial} className="btn btn-success mt-3">

                                Submit

                            </button>
                        </div>
                        )}
                    </div>
                );
             }
         }
     

