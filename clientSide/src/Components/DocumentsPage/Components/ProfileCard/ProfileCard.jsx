import './ProfileCard.css'

export default function ProfileCard(props) {

    return (
        <div className='profilecard-container'>
            <div className='profilecard-header'>
                <h2>Profile Information</h2>
                <button onClick={() => {props.setShowProfile(false)}} className='profilecard-closebutton'>X</button>
            </div>
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
        </div>
    )

}