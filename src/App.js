import { useEffect /*, useContext */ } from "react";
// import { Context } from "./store/store";
import Gauges from "./panels/GaugeDisplay/index";

function App() {
  //const context = useContext(Context);
  useEffect(() => {
    window.api.receive("fromMain", (data) => {
      console.log(`Received ${[JSON.stringify(data)]} from main process`);
    });
    // window.api.receive("OBD2", (data) => {
    //   console.log(`Received ${[JSON.stringify(data)]} from main process`);
    //   // setRpm(data.rpm);
    // });
    //window.api.send("toMain", "some data 2");
    // let count = 0;
    // setInterval(() => {
    //   context.actions.setFuelLevel(count++);
    // }, 1000);
  }, []);

  return (
    <div className="App">
      <Gauges />
    </div>
  );
}

export default App;
