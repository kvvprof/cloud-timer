/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Timer from '../Timer/Timer';
import Controls from '../Controls/Controls';
import './style.css';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Clouds from '../Clouds/Clouds';
import { getRandomValue } from '../../helpers/getRandomValue';
import finishTimer from '../../assets/sounds/finishTimer.mp3';
import remind from '../../assets/sounds/remind.mp3';
import pressBtn from '../../assets/sounds/pressBtn.mp3';
import Info from '../Info/Info';
import fav1 from '../../assets/images/fav-1.ico';
import fav2 from '../../assets/images/fav-2.ico';

const getFavicon = () => document.getElementById('favicon');

const App = () => {
	const [time, setTime] = useState(JSON.parse(localStorage.getItem('cloudTimerData'))?.time || 0);

	const [initTime, setInitTime] = useState(JSON.parse(localStorage.getItem('cloudTimerData'))?.initTime || 0);

	const [progress, setProgress] = useState(JSON.parse(localStorage.getItem('cloudTimerData'))?.progress || 0);

	const [settings, setSettings] = useState(
		JSON.parse(localStorage.getItem('cloudTimerSettings')) || { theme: 'light', clouds: 'on', sounds: 'on' }
	);

	const [isStart, setIsStart] = useState(false);

	const [isPause, setIsPause] = useState(false);

	const [isStop, setIsStop] = useState(true);

	const [cloudsArray, setCloudsArray] = useState([]);

	const [timeInterval, setTimeInterval] = useState();

	const [cloudInterval, setCloudInterval] = useState();

	const [remindInterval, setRemindInterval] = useState();

	const [isInfo, setIsInfo] = useState(false);

	const [isControlButton, setIsControlButton] = useState(false);

	const setHours = (direction) => {
		if (direction === 'up') {
			setTime((prev) => prev + 3600);
			setInitTime((prev) => prev + 3600);
		} else {
			if (time >= 3600) {
				setTime((prev) => prev - 3600);
				setInitTime((prev) => prev - 3600);
			}
		}
		setIsControlButton(false);
	};

	const setMinutes = (direction) => {
		if (direction === 'up') {
			setTime((prev) => prev + 60);
			setInitTime((prev) => prev + 60);
		} else {
			if (time >= 60) {
				setTime((prev) => prev - 60);
				setInitTime((prev) => prev - 60);
			}
		}
		setIsControlButton(false);
	};

	const setSeconds = (direction) => {
		if (direction === 'up') {
			setTime((prev) => prev + 1);
			setInitTime((prev) => prev + 1);
		} else {
			if (time >= 1) {
				setTime((prev) => prev - 1);
				setInitTime((prev) => prev - 1);
			}
		}
		setIsControlButton(false);
	};

	const addQuickTime = (seconds) => {
		setTime((prev) => prev + seconds);
		setInitTime((prev) => prev + seconds);
		setIsControlButton(false);
	};

	const createClouds = () => {
		if (settings.clouds === 'on') {
			setCloudInterval(
				setInterval(() => {
					setCloudsArray((prev) => [
						...prev,
						{ id: Date.now(), top: `${getRandomValue(10, 90)}%`, width: `${getRandomValue(80, 160)}px` }
					]);
				}, 5000)
			);
		}
	};

	const deleteCloud = (id) => {
		setCloudsArray((prev) => prev.filter((cloud) => cloud.id !== id));
	};

	const playSound = (sound) => {
		if (settings.sounds === 'on') {
			const audio = new Audio(sound);
			audio.volume = 0.1;
			audio.play();
		}
	};

	const changeFavicon = (active) => {
		const favicon = getFavicon();

		active ? (favicon.href = fav2) : (favicon.href = fav1);
	};

	const changeSettings = (option) => {
		switch (option) {
			case 'theme':
				setSettings((prev) => (prev.theme === 'light' ? { ...prev, theme: 'dark' } : { ...prev, theme: 'light' }));
				break;
			case 'clouds':
				setSettings((prev) => (prev.clouds === 'on' ? { ...prev, clouds: 'off' } : { ...prev, clouds: 'on' }));
				break;
			case 'sounds':
				setSettings((prev) => (prev.sounds === 'on' ? { ...prev, sounds: 'off' } : { ...prev, sounds: 'on' }));
				break;

			default:
				break;
		}
	};

	const startTimer = () => {
		setRemindInterval(clearInterval(remindInterval));

		if (time > 0) {
			changeFavicon(true);

			setIsStart(true);

			setIsPause(false);

			setIsStop(false);

			setTimeInterval(
				setInterval(() => {
					setTime((prev) => (prev >= 1 ? prev - 1 : 0));
				}, 1000)
			);

			createClouds();
		}

		time === 0 && stopTimer();
	};

	const pauseTimer = () => {
		changeFavicon(false);

		setIsStart(false);

		setIsPause(true);

		setIsStop(false);

		setTimeInterval(clearInterval(timeInterval));

		setCloudInterval(clearInterval(cloudInterval));

		setRemindInterval(
			setInterval(() => {
				playSound(remind);
			}, 300_000)
		);
	};

	const stopTimer = () => {
		changeFavicon(false);

		setIsStart(false);

		setIsPause(false);

		setIsStop(true);

		setTime(0);

		setInitTime(0);

		setProgress(0);

		setTimeInterval(clearInterval(timeInterval));

		setRemindInterval(clearInterval(remindInterval));

		setCloudInterval(clearInterval(cloudInterval));

		localStorage.setItem('cloudTimerData', JSON.stringify({ time, initTime, progress }));
	};

	// dynamic theme change
	useEffect(() => {
		localStorage.setItem('cloudTimerSettings', JSON.stringify(settings));

		if (settings.theme === 'dark') {
			document.body.style.background = 'linear-gradient(180deg, #313236 0%, #202124 100%)';
			document.body.style.opacity = 0.6;
			document.querySelector('.logo').style.color = '#A6A7A9';
		} else {
			document.body.style.background = 'linear-gradient(180deg, #eeeef5 0%, #c9d0f1 100%)';
			document.body.style.opacity = 1;
			document.querySelector('.logo').style.color = '#142b4a';
		}
	}, [settings.theme]);

	// update progress
	useEffect(() => {
		time !== initTime && setProgress(100 - Math.floor((time / initTime) * 100));

		if (isStart) {
			time === 0 &&
				setTimeout(() => {
					stopTimer();
					playSound(finishTimer);
				}, 1000);
		}
	}, [time]);

	// update LocalStorage
	useEffect(() => {
		localStorage.setItem('cloudTimerData', JSON.stringify({ time, initTime, progress }));
	}, [progress, time]);

	// clear clouds if limit
	useEffect(() => {
		cloudsArray.length >= 100 && setCloudsArray([]);
	}, [cloudsArray]);

	// clear the clouds if the tab is left
	window.onblur = () => {
		settings.clouds === 'on' && setCloudInterval(clearInterval(cloudInterval));
	};

	// create the clouds if the tab is active
	window.onfocus = () => {
		if (settings.clouds === 'on' && isStart) {
			settings.clouds === 'on' && createClouds();
		}
	};

	// start/pause by space
	useEffect(() => {
		const spaceBtnListener = (event) => {
			if (event.code === 'Space') {
				playSound(pressBtn);

				if (!isStart && !isPause && isStop) {
					time > 0 && startTimer();
					setIsControlButton(false);
				}

				if (isStart && !isPause && !isStop) {
					pauseTimer();
					setIsControlButton(false);
				}

				if (!isStart && isPause && !isStop) {
					startTimer();
					setIsControlButton(false);
				}
			}
		};

		isControlButton === false && document.addEventListener('keydown', spaceBtnListener);

		return () => document.removeEventListener('keydown', spaceBtnListener);
	}, [isStart, isPause, isStop, time]);

	return (
		<div className='app'>
			{cloudsArray.map((cloud) => (
				<Clouds
					key={cloud.id}
					id={cloud.id}
					top={cloud.top}
					width={cloud.width}
					deleteCloud={deleteCloud}
					playSound={playSound}
				/>
			))}
			<div className='container'>
				<h1 className='logo'>☁️ Cloud Timer ☁️</h1>
				<CircularProgressbarWithChildren className='progress-bar' value={progress}>
					<Timer
						time={time}
						isStart={isStart}
						setHours={setHours}
						setMinutes={setMinutes}
						setSeconds={setSeconds}
						playSound={playSound}
						addQuickTime={addQuickTime}
					/>
				</CircularProgressbarWithChildren>

				<Controls
					isStart={isStart}
					startTimer={startTimer}
					pauseTimer={pauseTimer}
					stopTimer={stopTimer}
					setIsInfo={setIsInfo}
					playSound={playSound}
					setIsControlButton={setIsControlButton}
				/>
			</div>
			<Info isInfo={isInfo} setIsInfo={setIsInfo} settings={settings} changeSettings={changeSettings} />
		</div>
	);
};

export default App;
