import './Documents.css'
import Navbar from './Components/Navbar/Navbar'



export default function Documents(props) {

    return (
        <div>
            <Navbar
                name={props.user.name}
                username={props.user.username}
                password={props.user.password}
                setUser={props.setUser}
            />
            <h1>Hello {props.user.name}</h1>
        </div>
    )
}