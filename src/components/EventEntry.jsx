import React from 'react';
import PropTypes from 'prop-types';

export default class EventEntry extends React.Component {

    static propTypes = {
        action: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
    };

    render() {
        const { action, time, title } = this.props;
        return (
            <div className="event-item" >
                <h3>{ title }</h3>
                <p>
                    Time: { new Date(time).toString() }
                    <br />
                    <em>Action: { action }</em>
                </p>
            </div>
        );
    }
}
