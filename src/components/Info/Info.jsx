import React from 'react';
import Settings from '../Settings/Settings';
import './style.css';

const Info = ({ isInfo, setIsInfo, settings, changeSettings, playSound}) => {
	return (
		<div className='info' style={{ display: isInfo ? 'flex' : 'none' }}>
			<div className='info__closing-area' onClick={() => setIsInfo(false)}></div>
			<div className='info__content'>
				<button className='info__close-btn' onClick={() => setIsInfo(false)}></button>
				<h1 className='info__title'>☁️ Cloud Timer ☁️</h1>

				<Settings settings={settings} changeSettings={changeSettings} playSound={playSound} />

				<p className='info__text'>A simple countdown timer for work or study.</p>

				<p className='info__text'>
					If the timer is on pause, then an audio alert will occur every 5 minutes so that you don't forget about it.
				</p>

				<p className='info__text'>You can press "Space" for start/pause timer.</p>

				<p className='info__text'>Clouds don't create if the timer and tab are not active.</p>

				<a className='info__link' href='https://github.com/kvvprof' target='_blank' rel='noopener noreferrer'>
					Created by kvvprof
				</a>
				<a
					className='info__link'
					href='https://dribbble.com/shots/12024270-Countdown-Timer-DailyUI014'
					target='_blank'
					rel='noopener noreferrer'>
					Design
				</a>
			</div>
		</div>
	);
};

export default Info;
