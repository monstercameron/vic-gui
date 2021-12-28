import { useState } from 'react';
import axios from 'axios';

const App = (props) => {

    const [selected, setSelected] = useState('settings');

    const handleAppSwitcher = (window) => () => {
        axios.get(`http://localhost:3000/api/window?title=${window}`)
            .then(res => {
                console.log(res);
                setSelected(window);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleSettingClick = (window) => () => {
        axios.get(`http://localhost:3000/api/minimize`)
            .then(res => {
                console.log(res);
                setSelected(window);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const css = `
    .appswitcher_main {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        width: 99vw;
        height: 92vh;
        margin-left: .15vw;
    }

    .appswitcher_main > div {
        border-left: 1px solid #ccc;
        font-family: 'Roboto', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .appswitcher_main > div:first-child {
        border-left: none;
    }
    .appswitcher_main > div:last-child {

    }

    .selected {
        background-color: rgba(0, 0, 0, 1);
        color: white;
    }

    `

    return (
        <>
            <style>{css}</style>
            <div className='appswitcher_main'>
                <div className={`${selected === 'settings' ? 'selected' : ''}`}
                    onClick={handleSettingClick('settings')}>
                    <h1>Settings</h1>
                </div>
                <div className={`${selected === 'yourPhone' ? 'selected' : ''}`}
                    onClick={handleAppSwitcher('yourPhone')}>
                    <h1>My Phone</h1>
                </div>
                <div className={`${selected === 'calculator' ? 'selected' : ''}`}
                    onClick={handleAppSwitcher('calculator')}>
                    <h1>Calculator</h1>
                </div>
                <div className={`${selected === 'maps' ? 'selected' : ''}`}
                    onClick={handleAppSwitcher('maps')}>
                    <h1>Maps</h1>
                </div>
                <div className={`${selected === 'spotify' ? 'selected' : ''}`}
                    onClick={handleAppSwitcher('spotify')}>
                    <h1>Spotify</h1>
                </div>
                <div className={`${selected === 'camera' ? 'selected' : ''}`}
                    onClick={handleAppSwitcher('camera')}>
                    <h1>Camera</h1>
                </div>
                <div className={`${selected === 'photos' ? 'selected' : ''}`}
                    onClick={handleAppSwitcher('photos')}>
                    <h1>Photos</h1>
                </div>
                <div className={`${selected === 'voiceRecorder' ? 'selected' : ''}`}
                    onClick={handleAppSwitcher('voiceRecorder')}>
                    <h1>Voice Recorder</h1>
                </div>
                <div className={`${selected === 'mail' ? 'selected' : ''}`}
                    onClick={handleAppSwitcher('mail')}>
                    <h1>Mail</h1>
                </div>
                <div className={`${selected === 'edge' ? 'selected' : ''}`}
                    onClick={handleAppSwitcher('edge')}>
                    <h1>Microsoft Edge</h1>
                </div>
            </div>
        </>
    )
}

export default App