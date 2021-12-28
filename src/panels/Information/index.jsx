import { useEffect, useState } from 'react';
import Guage1 from '../../components/Gauges/number/index';

export default () => {

    let ws;

    const [vss, setVss] = useState(0)
    const [rpm, setRpm] = useState(0)

    const handleIncomingMessage = (event) => {
        //console.log(event);
        const data = JSON.parse(event.data)
        console.log(data);
        switch (data.name) {
            case 'vss':
                setVss(data.value);
                break;
                case 'rpm':
                    setRpm(data.value);
                    break;
            default:
                break;
        }
    };

    useEffect(() => {
        ws = new WebSocket('ws://localhost:3003/');

        ws.onopen = () => {
            console.log('connected');
            ws.send('Hello Server!');
        }

        ws.onmessage = handleIncomingMessage
    }, []);


    const css = `
    .wrapper{
        overflow: hidden;
        height: 98vh;
        width: 97vw;
    }

    .information_main {
        background-color: none;
        display: grid !important;
        grid-template-rows: repeat(6, 16vh);
        grid-template-columns: 1fr;
        //gap: 1em;
        //height: 60vh;
        width: 100vw;
    }
    
    .information_main > div {
        //border:1px solid black;
    }
    `

    return (
        <>
            <style>{css}</style>
            <div className='wrapper'>
                <div className={`information_main`}>
                    <div><Guage1 value={vss} label='MPH' /></div>
                    <div><Guage1 value={rpm} label='RPM' /></div>
                    <div><Guage1 value={'2'} label='GEAR' /></div>
                    <div><Guage1 value={`${50}%`} label='FUEL REMAINING' /></div>
                    <div><Guage1 value={`${150}`} label='MILES OF RANGE' /></div>
                    <div><Guage1 value={`${384}`} label='TRIP MILES' /></div>
                </div>
            </div>
        </>
    )
};