import React from 'react';
import './App.css';
import axios from 'axios';

import EventEntries from './components/EventEntries';
import EventForm from './components/EventForm';
import Stats from './components/Stats';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            stats: {}
        };

        this._timer = null;
    }

    componentDidMount() {
        // Call our refresh function below once the component mounts
        this.refresh();
    }

    componentWillUnmount() {
        // Cancel any running refresh timeouts
        clearTimeout(this._timer);
        this._timer = null;
    }

    refresh = async () => {
        // Call our fetch function below once the component mounts
        console.log('refreshing');
        try {
            const res = await this.callBackendAPI();
            this.setState({ data: res.events, stats: res.stats });
            console.log(res.stats.db);
        } catch (err) {
            console.error(err);
        } finally {
            this._timer = setTimeout(this.refresh, 30000);
        }
    }

    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    // send data from form elements to the server's calendar interface
    onSubmitEvent = async (eventData) => {
        // post to the express API and update the event listings
        try {
            const result = await axios.post('/addevent', eventData);
            this.setState({ data: result.data.express });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const { data, stats } = this.state;
        return (
            <div className="content-container">
                <div className="event-container">
                    <h1>Add an Event</h1>
                    <EventForm onSubmitEvent={ this.onSubmitEvent } />
                    <EventEntries events={ data } />
                </div>
                <div className="status-container">
                    <Stats
                        db={ stats.db }
                        fps={ stats.fps }
                        preset={ stats.preset }
                        soundon={ stats.soundon }
                    />
                </div>
            </div>
        );
    }
}
