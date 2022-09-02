import React from 'react';
import './style.css';

const Settings = ({ settings, changeSettings }) => {
	return (
		<fieldset className='settings'>
			<div className='settings__item'>
				<input
					className='settings__value'
					type='checkbox'
					id='theme'
					name='theme'
					onChange={() => changeSettings('theme')}
					checked={settings.theme === 'light' ? false : true}
				/>
				<label className='settings__title' htmlFor='theme'>
					Dark theme
				</label>
			</div>

			<div className='settings__item'>
				<input
					className='settings__value'
					type='checkbox'
					id='clouds'
					name='clouds'
					onChange={() => changeSettings('clouds')}
					checked={settings.clouds === 'on' ? true : false}
				/>
				<label className='settings__title' htmlFor='clouds'>
					Clouds (restart the timer)
				</label>
			</div>

			<div className='settings__item'>
				<input
					className='settings__value'
					type='checkbox'
					id='sounds'
					name='sounds'
					onChange={() => changeSettings('sounds')}
					checked={settings.sounds === 'on' ? true : false}
				/>
				<label className='settings__title' htmlFor='sounds'>
					Sounds
				</label>
			</div>
		</fieldset>
	);
};

export default Settings;
