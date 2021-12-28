import { useEffect, useState } from 'react'
const Index = (props) => {
    const css = `
        .gauge_number {
            color: black;
            text-align: center;
            font-family: sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 150%;
        }
        .gauge_number > div {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            grid-template-rows: repeat(2, 1fr);
        }
        .gauge_number > div > div > div:first-child {
            font-size: 4.5em;
        }
        .gauge_number > div > div > div:last-child {
            font-size: 2.5em;
        }
    `
    const [pollValue, setPollValue] = useState('calculating')
    let poller = null
    useEffect(() => {
        if (props?.poll) {
            poller = setInterval(() => {
                setPollValue(props.value())
                console.log(props.label, 'polled');
            }, props.poll)
        }
        return () => {
            clearInterval(poller)
        }
    }, [])

    return (
        <>
            <style>{css}</style>
            <div className='gauge_number'>
                <div>
                    <div>
                        <div>
                            {props && typeof props.value === 'function' ? pollValue : props.value || "0"}</div>
                        <div>
                            {props && props.label || ""}</div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </>
    );
};
export default Index;