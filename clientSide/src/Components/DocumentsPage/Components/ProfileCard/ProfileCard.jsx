import './ProfileCard.css'
import { useState } from 'react'

export default function ProfileCard(props) {

    return (
        <div className='profilecard-container'>
            <h2>Profile Information</h2>
            <div className='profilecard-profilefield'>
                <label>Name:</label>
                <span>{props.name}</span>
            </div>
            <div className='profilecard-profilefield'>
                <label>Username:</label>
                <span>{props.username}</span>
            </div>
            <div className='profilecard-profilefield'>
                <label>Password:</label>
                <span>{props.password}</span>
            </div>
            <button onClick={() => {props.setShowProfile(false)}} className='profilecard-closebutton'>Close</button>
        </div>
    )

}