import React from 'react';
import PropTypes from 'prop-types';

export default class Stats extends React.Component {

	static propTypes = {
		db: PropTypes.string,
		fps: PropTypes.string,
		preset: PropTypes.string,
		soundon: PropTypes.oneOf(["on", "off"])
	};

	render() {
		const { db, fps, preset, soundon } = this.props;
		return (
			<ul>
				<li>Audio: { soundon }</li>
				<li>Graphics: { fps } fps</li>
				<li>Sound Level: { db } dB</li>
				<li>Current Program: <em>{ preset }</em></li>
			</ul>
		);
	}
}