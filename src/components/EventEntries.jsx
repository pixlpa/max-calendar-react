import React from 'react';
import PropTypes from 'prop-types';

import EventEntry from './EventEntry';

export default class EventEntries extends React.Component {

    static propTypes = {
        events: PropTypes.array.isRequired
    }

    render() {
        const { events } = this.props;
        return (
            <div className="App-intro">
                {
                    events.map((event) => <EventEntry
                        key={ event.id }
                        id={ event.id }
                        action={ event.action }
                        time={ event.time }
                        title={ event.title }
                    />)
                }
            </div>
        );
    }
}
