import './style.css';
import pressBtn from '../../assets/sounds/pressBtn.mp3';
import QuickTime from '../QuickTime/QuickTime';

const Timer = ({ time, isStart, setHours, setMinutes, setSeconds, playSound, addQuickTime }) => {
	const hours = Math.floor(time / 60 / 60);
	const minutes = Math.floor(time / 60 - hours * 60);
	const seconds = time - (hours * 60 * 60 + minutes * 60);

	return (
		<div className='timer'>
			<div className='timer__inner'>
				<div className='timer__item'>
					{!isStart && (
						<div
							className='timer__up'
							onClick={() => {
								setHours('up');
								playSound(pressBtn);
							}}></div>
					)}
					<div className='timer__value'>
						{hours < 10 && '0'}
						{hours}
					</div>
					{!isStart && (
						<div
							className='timer__down'
							onClick={() => {
								setHours('down');
								playSound(pressBtn);
							}}></div>
					)}
				</div>
				<div className='timer__separator'></div>
				<div className='timer__item'>
					{!isStart && (
						<div
							className='timer__up'
							onClick={() => {
								setMinutes('up');
								playSound(pressBtn);
							}}></div>
					)}
					<div className='timer__value'>
						{minutes < 10 && '0'}
						{minutes}
					</div>
					{!isStart && (
						<div
							className='timer__down'
							onClick={() => {
								setMinutes('down');
								playSound(pressBtn);
							}}></div>
					)}
				</div>
				<div className='timer__separator'></div>
				<div className='timer__item'>
					{!isStart && (
						<div
							className='timer__up'
							onClick={() => {
								setSeconds('up');
								playSound(pressBtn);
							}}></div>
					)}
					<div className='timer__value'>
						{seconds < 10 && '0'}
						{seconds}
					</div>
					{!isStart && (
						<div
							className='timer__down'
							onClick={() => {
								setSeconds('down');
								playSound(pressBtn);
							}}></div>
					)}
				</div>
			</div>
			{!isStart && <QuickTime playSound={playSound} addQuickTime={addQuickTime} />}
		</div>
	);
};

export default Timer;
