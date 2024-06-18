import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "@stomp/stompjs";

import ExitIcon from "../../assets/logout.png";

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
  const navigate = useNavigate();

  console.log(props.document);

  const [client, setClient] = useState();
  const [quill, setQuill] = useState();

  useEffect(() => {
    if (quill == null) return;
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/api",
      onConnect: () => {
        stompClient.subscribe(
          `/app/subscribe/${props.document["documentId"]}/${props.user["username"]}`,
          (message) => {
            // Load
          }
        );
        stompClient.subscribe(
          `/topic/public/${props.document["documentId"]}`,
          (message) => {
            const info = JSON.parse(message.body);
            if (info["username"] === props.user["username"]) return;
            quill.updateContents(info["delta"]);
          }
        );
        setClient(stompClient);
      },
    });
    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [quill]);

  useEffect(() => {
    if (quill == null || client == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      client.publish({
        destination: `/app/${props.document["documentId"]}/sendData`,
        body: JSON.stringify({
          delta,
          username: props.user["username"],
        }),
      });
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
      readOnly: props.document["role"] === "VIEWER",
    });

    // const customButton = wrapper.querySelector(".ql-exit");
    // if (customButton) {
    //   customButton.addEventListener("click", () => {
    //     navigate("/Documents"); // Navigate to desired route
    //   });
    // }

    setQuill(q);
  }, []);

  return <div className="container" ref={wrapperRef}></div>;
}
