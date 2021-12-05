import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default (props) => {
  const [container, setContainer] = useState(null);
  const newWindow = useRef(window);

  useEffect(() => {
    const div = document.createElement("div");
    setContainer(div);
  }, []);

  useEffect(() => {
    if (container) {
      newWindow.current = window.open(
        "",
        "",
        props.dims || "width=600,height=400,left=200,top=200"
      );
      newWindow.current.document.body.appendChild(container);
      newWindow.current.document.title = props.title || "panel";
      const curWindow = newWindow.current;
      return () => curWindow.close();
    }
  }, [container]);

  return container && createPortal(props.children, container);
};
