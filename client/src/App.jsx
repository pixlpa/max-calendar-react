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
          data: [],
          stats: {}
        }
      }
    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI()
        .then(res =>  { 
            this.setState({ data: res.events });
            this.setState({ stats: res.stats });
            this.timer = setInterval(()=> this.refresh(), 30000);
        })
        .catch(err => console.log(err));
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    refresh() {
        // Call our fetch function below once the component mounts
        console.log("refreshing");
        this.callBackendAPI()
        .then(res =>  { 
            this.setState({ data: res.events });
            this.setState({ stats: res.stats });
            console.log(res.stats.db);
        })
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

    //send data from form elements to the server's calendar interface
    submit(e){
        e.preventDefault();
        // build a JSON object with the form data (stored in this.state)
        let submission = {
            "title": this.state.title,
            "date": this.state.date,
            "time": this.state.time,
            "action": this.state.action
        };
        //post to the express API and update the event listings
        axios.post('/addevent', submission)
        .then((result) => {
            this.setState({ data: result.data.express });
        });
      }

    render() {
        console.log("render called");
        return (
            <div className="content-container">
            <div
                className="event-container">            
            <h1>Add an Event</h1>
                <div className="event-form">
                <form onSubmit={this.submit.bind(this)}  className="form-inline">
                    <input placeholder="title" name="title" className="form-control" onChange={this.onChange} />
                    <input type="date" name="date" className="date-picker form-control"  onChange={this.onChange}
                        />
                    <input type="time" name="time" className="form-control" onChange={this.onChange} />
                    <select placeholder="action" name="action" className="form-control" onChange={this.onChange} >
                        <option>launch</option>
                        <option>mute</option>
                        <option>idle</option>
                        <option>preset-next</option>
                    </select>
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
            <div className="status-container">
                <ul>
                    <li>Audio: {this.state.stats.soundon}</li>
                    <li>Graphics: {this.state.stats.fps} fps</li>
                    <li>Sound Level: {this.state.stats.db} dB</li>
                    <li>Current Program: <em>{this.state.stats.preset}</em></li>
                </ul>
            </div>
            </div>
        )
    }
}

export default App;
