import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            date: "",
            time: "",
            action: "",
          data: []
        }
      }
    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
    }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
      const response = await fetch('/express_backend');
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submit(e){
        //const self = this.state;
        e.preventDefault();
        let submission = {
            "title": this.state.title,
            "date": this.state.date,
            "time": this.state.time,
            "action": this.state.action
        };

        axios.post('/addevent', submission)
        .then((result) => {
            this.setState({ data: result.data.express });
        });
      }

    render() {
        return (
            <div
                className="event-container">            
            <h1>Add an Event to your Max patcher</h1>
                <div className="event-form">
                <form onSubmit={this.submit.bind(this)}  className="form-inline">
                    <input placeholder="title" name="title" className="form-control" onChange={this.onChange} />
                    <input type="date" name="date" className="date-picker form-control"  onChange={this.onChange}
                        />
                    <input type="time" name="time" className="form-control" onChange={this.onChange} />
                    <input placeholder="action" name="action" className="form-control" onChange={this.onChange} />
                    <button type = "submit" className="btn btn-success">Add Event</button>
                </form>
                </div>
                <div className="App-intro">{this.state.data.map((event,k)=>{
                    const dateString = new Date(event.time).toString();
                    return (
                        <div key={k}
                            className="event-item">
                            <h3>{event.title}</h3>
                            <p>Time: {dateString}<br />
                            <em>Action: {event.action}</em></p>
                            </div>
                    );
                })}</div>
            </div>
        )
    }
}

export default App;
