import './DocumentCard.css'
import RenameDocument from '../RenameDocument/RenameDocument'
import ShareDocument from '../ShareDocument/ShareDocument'

import ThreeDots from '../../../../assets/dots.png'
import eye from '../../../../assets/eye.png'

import { useState } from 'react'

export default function DocumentCard(props) {

    const [toggleDropdown, setToggleDropdown] = useState(false);

    const [showRename, setShowRename] = useState(false);
    const [showShare, setShowShare] = useState(false);

    const [title, setTitle] = useState(props.title); 
    
    function handleDelete() {
        fetch("http://localhost:8080/api/mixed/DeleteDocument", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({documentId: props.documentId})
        })
        .then((response) => {
            if (response.status === 400) {
                props.toast.error("Could not connect to server, please try again later");
            } else if (response.status === 200) {
                props.toast.success("Document Deleted Successfully");
                props.setDocuments(prevDocs => (prevDocs.filter(doc => doc.documentId !== props.documentId)));
            }
        })
    }

    function handleRemoveAccess() {
        fetch("http://localhost:8080/api/userdocuments/RemoveAccess", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({documentId: props.documentId, username: props.username})
        })
        .then((response) => {
            if (response.status === 400) {
                props.toast.error("Could not connect to server, please try again later");
            } else if (response.status === 200) {
                props.toast.success("Access Removed Successfully Successfully");
                props.setDocuments(prevDocs => (prevDocs.filter(doc => doc.documentId !== props.documentId)));
            }
        })
    }

    return (
        <div>
        <div className='documentcard-container'>
            <div>
                <div className='documentcard-header'>
                    <h2>{title}</h2>
                    <div className='documentcard-images'>
                        {props.role === 'VIEWER' &&
                            <img
                                src={eye}
                                alt='Viewer or Not'
                                className='documentcard-eye'
                                title='Viewer'
                            />
                        }
                        <img
                            src={ThreeDots}
                            alt='Options'
                            className={`documentcard-OptionImg ${toggleDropdown ? 'rotate' : ''}`}
                            onClick={() => {setToggleDropdown(!toggleDropdown)}}
                            title='Options'
                        />
                        {toggleDropdown && props.role === 'OWNER' &&
                            <div className='documentcard-dropdown-content'>
                                <span onClick={() => {setShowRename(!showRename); setToggleDropdown(!toggleDropdown)}}>Rename Document</span>
                                <span onClick={() => {setShowShare(!showShare); setToggleDropdown(!toggleDropdown)}}>Share Document</span>
                                <span onClick={handleDelete}>Delete Document</span>
                            </div>
                        }
                        {toggleDropdown && props.role !== 'OWNER' &&  
                            <div className='documentcard-dropdown-content'>
                                <span onClick={handleRemoveAccess}>Remove Accessiblity</span>
                            </div>
                        }    
                    </div>
                </div>
                <p>{props.description}</p>
            </div>
            <button>Open Document</button>
        </div>
        {showRename &&
            <RenameDocument
                setShowRename={setShowRename}
                documentId={props.documentId}
                setDocuments={props.setDocuments}
                setTitle={setTitle}
                toast={props.toast}
            />
        }
        {showShare &&
            <ShareDocument
                setShowShare={setShowShare}
                documentId={props.documentId}
                username={props.username}
                toast={props.toast}
            />
        }
        </div>
    )
}