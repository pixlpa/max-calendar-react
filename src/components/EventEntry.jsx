import React from 'react';
import PropTypes from 'prop-types';

export default class EventEntry extends React.Component {

    static propTypes = {
        action: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired
    };

    deleteThis = async () => {
        try {
            const {id} = this.props;
            await this.props.delete(id);
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const { action, time, title } = this.props;
        return (
            <div className="event-item" >
                <div className="event-title">
                <h3>{ title }</h3>
                <div className="delete-button" onClick={this.deleteThis}>&#x2715;</div>
                </div>
                <p>
                    Time: { new Date(time).toString() }
                    <br />
                    <em>Action: { action }</em>
                </p>

            </div>
        );
    }
}
