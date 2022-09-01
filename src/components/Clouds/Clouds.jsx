import React from 'react';
import './style.css';
import clickCloud from '../../assets/sounds/clickCloud.mp3';

const Clouds = ({ id, top, width, deleteCloud, playSound }) => {
	return (
		<div
			className='cloud'
			style={{ top, width }}
			onClick={() => {
				deleteCloud(id);
				playSound(clickCloud);
			}}></div>
	);
};

export default Clouds;
