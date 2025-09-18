import { NavLink } from "react-router-dom"
import { useWine } from "../context/WineContext"
import Login from "../pages/Login"

export default function AppHeader(){

    const {isAdmin, logout} = useWine()

    return(
        <>
        <header>
        <h2>Io sono il header</h2>
        <nav>
            <NavLink to="/">Lista vini</NavLink>
            <NavLink to="/compare">Comparatore</NavLink>
            <NavLink to="/preferiti">Preferiti</NavLink>
            <NavLink to="/cantine">Lista cantine</NavLink>
            <NavLink to="/login">Login</NavLink>
            {isAdmin && <NavLink to = {"add-wine"}>Aggiungi Vino</NavLink>}
            {isAdmin && <button onClick={logout}>Logout</button>}
        </nav>
        </header>
        </>
    )
}