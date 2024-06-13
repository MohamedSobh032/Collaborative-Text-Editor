import './DocumentCard.css'

import ThreeDots from '../../../../assets/dots.png'
import eye from '../../../../assets/eye.png'

import { useState } from 'react'

export default function DocumentCard(props) {

    const [toggleDropdown, setToggleDropdown] = useState(false);

    return (
        <div className='documentcard-container'>
            <div>
                <div className='documentcard-header'>
                    <h2>{props.title}</h2>
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
                                <span>Rename Document</span>
                                <span>Share Document</span>
                                <span>Delete Document</span>
                            </div>
                        )}
                    </div>
                </div>
                <p>{props.description}</p>
            </div>
            <button>Open Document</button>
        </div>
    )
}