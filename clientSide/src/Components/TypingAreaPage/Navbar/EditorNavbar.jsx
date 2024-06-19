import './EditorNavbar.css'
import DocIcon from '../../../assets/DocumentIcon.png'

import ExitIcon from '../../../assets/logout.png'
import ExitHovered from '../../../assets/logoutH.png'

import SaveIcon from '../../../assets/save.png'
import SaveHovered from '../../../assets/saveH.png'

import { useState } from 'react'

export default function EditorNavbar(props) {

    const [saveh, setSaveh] = useState(false);
    const [logh, setLogh] = useState(false);

    return (
        <div className='EditorNavbar-container'>
            <div className='EditorNavbar-left-section'>
                <img src={DocIcon} alt='Document Icon' className='EditorNavbar-icon' />
                <h2>{props.documentTitle}</h2>
            </div>
            <div className='EditorNavbar-middle-section'>
                <img
                    src={saveh ? SaveHovered : SaveIcon}
                    alt='Save Icon'
                    className='EditorNavbar-icon'
                    onMouseEnter={() => { setSaveh(true) }}
                    onMouseLeave={() => { setSaveh(false) }}
                    onClick={props.saveDocument}
                />

                <img
                    src={logh ? ExitHovered : ExitIcon}
                    alt='Exit Icon'
                    className='EditorNavbar-icon'
                    onMouseEnter={() => { setLogh(true) }}
                    onMouseLeave={() => { setLogh(false) }}
                    onClick={props.exit}
                />
            </div>
        </div>
    )
}