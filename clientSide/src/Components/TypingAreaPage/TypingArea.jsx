import Quill from "quill"
import "quill/dist/quill.snow.css"
// import Stomp from 'stompjs'
// import SockJS from 'sockjs-client'

import { useCallback, useEffect, useState } from 'react'

import './TypingArea.css'

const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
]


export default function TypingArea(props) {


    // const [stompClient, setStompClient] = useState(null);

    // useEffect(() => {
    //     const socket = new SockJS("http://localhost:8080/ws");
    //     const client = Stomp.over(socket);
    //     client.connect({}, () => {
    //         client.subscribe('/topic/')
    //     })

    //     setStompClient(client);

    // }, [])

    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return;
        wrapper.innerHTML = "";
        const editor = document.createElement("div");
        wrapper.append(editor);
        new Quill(editor, {theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS}})
    }, []);

    return <div className="container" ref={wrapperRef}></div>
}