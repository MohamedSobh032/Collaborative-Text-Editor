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
        
    }

    return (
        <div>
        <div className='documentcard-container'>
            <div>
                <div className='documentcard-header'>
                    <h2>{title}</h2>
                    <div className='documentcard-images'>
                        {props.isViewer &&
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
                        {toggleDropdown && (
                            <div className='documentcard-dropdown-content'>
                                <span onClick={() => {setShowRename(!showRename); setToggleDropdown(!toggleDropdown)}}>Rename Document</span>
                                <span onClick={() => {setShowShare(!showShare); setToggleDropdown(!toggleDropdown)}}>Share Document</span>
                                <span>Delete Document</span>
                            </div>
                        )}
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