import { NavLink } from "react-router-dom";

export const Navbar = () =>{
    if (window.location.pathname==="/login") return null; else return(
        <nav>
            {/* <NavLink to='/'>Home</NavLink>
            <NavLink to='/about'>About</NavLink> */}
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/about'>About</NavLink></li>
                <li style={{'float':'right'}}><NavLink to='/login'>Login</NavLink></li>
                <li style={{'float':'right'}}><NavLink to='/signup'>Signup</NavLink></li>
            </ul>
        </nav>
    )
}