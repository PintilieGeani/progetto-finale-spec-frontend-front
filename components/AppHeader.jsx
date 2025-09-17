import { NavLink } from "react-router-dom"

export default function AppHeader(){
    return(
        <>
        <h2>Io sono il header</h2>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/compare">Comparatore</NavLink>
        </nav>
        </>
    )
} 