import React from 'react';
import './style.css';
import pressBtn from '../../assets/sounds/pressBtn.mp3';

const QuickTime = ({ playSound, addQuickTime }) => {
	return (
		<div className='quick-time'>
			<button
				className='quick-time__time'
				onClick={() => {
					playSound(pressBtn);
					addQuickTime(5 * 60);
				}}>
				+5 min
			</button>
			<button
				className='quick-time__time'
				onClick={() => {
					playSound(pressBtn);
					addQuickTime(15 * 60);
				}}>
				+15 min
			</button>
			<button
				className='quick-time__time'
				onClick={() => {
					playSound(pressBtn);
					addQuickTime(30 * 60);
				}}>
				+30 min
			</button>
		</div>
	);
};

export default QuickTime;
