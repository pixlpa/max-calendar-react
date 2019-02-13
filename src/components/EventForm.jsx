import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class EventForm extends Component {

    static propTypes = {
        onSubmitEvent: PropTypes.func.isRequired
    };

    static defaultState = {
        title: "",
        date: "",
        time: "",
        action: ""
    };

    constructor(props) {
        super(props);

        this.state = Object.assign({}, this.constructor.defaultState);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmitEvent({
            "title": this.state.title,
            "date": this.state.date,
            "time": this.state.time,
            "action": this.state.action
        });

        this.setState(Object.assign({}, this.constructor.defaultState));
    }

    render(){
        const { action, date, time, title } = this.state;

        return (
            <div className="event-form">
                <form onSubmit={ this.onSubmit } className="form-inline" >
                    <input placeholder="title" name="title" className="form-control" onChange={ this.onChange } value={ title } />
                    <input type="date" name="date" className="date-picker form-control" onChange={ this.onChange } value={ date } />
                    <input type="time" name="time" className="form-control" onChange={ this.onChange } value={ time } />
                    <select placeholder="action" name="action" className="form-control" onChange={ this.onChange } value={ action } >
                        <option value="launch">launch</option>
                        <option value="mute">mute</option>
                        <option value="idle">idle</option>
                        <option value="preset-next">preset-next</option>
                    </select>
                    <button type="submit" className="btn btn-success">Add Event</button>
                </form>
            </div>
        );
    }
}
