import './style.css';
import pressBtn from '../../assets/sounds/pressBtn.mp3';

const Controls = ({ isStart, startTimer, pauseTimer, stopTimer, setIsInfo, playSound, setIsControlButton }) => {
	return (
		<div className='controls'>
			<button
				className='controls__stop'
				onClick={() => {
					stopTimer();
					playSound(pressBtn);
				}}></button>

			<button
				className='controls__info'
				onClick={() => {
					setIsInfo(true);
					playSound(pressBtn);
					setIsControlButton(true);
				}}></button>

			{isStart ? (
				<button
					className='controls__pause'
					onClick={() => {
						pauseTimer();
						playSound(pressBtn);
						setIsControlButton(true);
					}}></button>
			) : (
				<button
					className='controls__play'
					onClick={() => {
						startTimer();
						playSound(pressBtn);
						setIsControlButton(true);
					}}></button>
			)}
		</div>
	);
};

export default Controls;
