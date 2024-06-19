import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "@stomp/stompjs";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./TypingArea.css";
import EditorNavbar from "./Navbar/EditorNavbar";

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

  const [client, setClient] = useState();
  const [quill, setQuill] = useState();


  function saveDocument() {
    let delta = quill.getContents();
    client.publish({
      destination: `/app/${props.document["documentId"]}/saveData`,
      body: JSON.stringify({
        delta
      }),
    });
    toast.success("Document Saved Successfully")
  }

  useEffect(() => {
    if (quill == null) return;
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/api",
      onConnect: () => {
        stompClient.subscribe(
          `/app/subscribe/${props.document["documentId"]}/${props.user["username"]}`,
          (message) => {
            const deltas = JSON.parse(message.body);
            if (deltas[0] !== null && deltas[0].length !== 0) {
              quill.updateContents(deltas[0]);
            }
            if (deltas[1] !== null && deltas[1].length !== 0) {
              deltas[1].forEach((delta) => { quill.updateContents(delta) })
            }
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
    setQuill(q);
  }, [props.document]);

  return (
    <div>
      <ToastContainer />
      <div className='TextEditorNavbar-Container'>
        <EditorNavbar
          documentTitle={props.document.documentTitle}
          saveDocument={saveDocument}
          exit={() => { navigate('/Documents') }}
        />
      </div>
      <div className="container" ref={wrapperRef}></div>
    </div>
  );
}
