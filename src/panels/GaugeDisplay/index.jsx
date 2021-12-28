import { useContext, useState } from 'react'
import { Context } from '../../store/store'
import FuelGauge from "../../components/Gauges/fuelGauge/index";
import NumberGauge from "../../components/Gauges/number/index";
import { main } from "./index.module.css"


export default function Index() {
    const { store, actions } = useContext(Context)
    const [rpm, setRPM] = useState(0)
    const [vss, setVSS] = useState(0)
    const [fli, setFLI] = useState(0)
    const [temp, setTemp] = useState(0)

    const filterData = (data) => {
        console.log('inside filter');
        switch (data.name) {
            case 'vss':
                setVSS(data.value)
                break;
            case 'temp':
                setTemp(data.value)
                break;
            case 'rpm':
                setRPM(data.value)
                break;
            default:
                console.log(`Sensor: ${data.name} not yet implemented`);
                break;
        }
    }

    window.api.receive("OBD2", (data) => {
        // console.log(`Received ${[JSON.stringify(data)]} from main process`);
        // setRpm(data.rpm);
        filterData(data)
    });

    return (
        <div className={main}>
            <FuelGauge value={0} />
            <NumberGauge value={rpm} label={'RPM'} />
            <NumberGauge value={vss} label={'MPH'} />
            <NumberGauge value={actions.currentTripMileage} label={'Trip Miles'} poll={1000 * 60} />
            <NumberGauge value={store.MAXRANGE * (fli / 100)} label={'Range'} />
        </div>
    )
}
