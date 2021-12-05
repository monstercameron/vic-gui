import { useState } from "react";
import RenderInWindow from "./components/newWindow";
import BottomPanel from "./panels/AppSwitcher";

function App() {
  const [open, setOpen] = useState();
  const {
    screen: { height, width },
  } = window;

  const setDims = (width, height, left, top) => {
    // if null assume full width??
    return `width=${width},height=${height},left=${left},top=${top}`;
  };

  return (
    <div className="App">
      <button onClick={() => setOpen(!open)}>open</button>
      {open && (
        <RenderInWindow
          title="sidePanel"
          dims={setDims(300, height - 300, 0, 10)}
        >
          vert
          <BottomPanel />
        </RenderInWindow>
      )}
      {open && (
        <RenderInWindow
          title="bottomPanel"
          dims={setDims(width, 200, 300, 2060)}
        >
          horiz
          <BottomPanel />
        </RenderInWindow>
      )}
    </div>
  );
}

export default App;
