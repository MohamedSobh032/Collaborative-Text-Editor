import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

import "./TypingArea.css";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }],
  [{ align: [] }],
];

export default function TypingArea(props) {
  const [client, setClient] = useState(null);
  const [quill, setQuill] = useState();

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/api",
      onConnect: () => {
        stompClient.subscribe(
          `/app/subscribe/${props.document["documentId"]}/${props.user["username"]}`,
          (message) => {
            console.log(JSON.parse(message.body));
          }
        );
        setClient(stompClient);
      },
    });
    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  useEffect(() => {
    if (!(quill && client)) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      let index = delta.ops[0]["retain"] || 0;
      console.log(delta.ops);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [client, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    setQuill(q);
  }, []);

  return <div className="container" ref={wrapperRef}></div>;
}
