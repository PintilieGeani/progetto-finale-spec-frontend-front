import { NavLink, useNavigate } from "react-router-dom"
import { useWine } from "../context/WineContext"
import Login from "../pages/Login"

export default function AppHeader(){

    const navigate = useNavigate()

    const {isAdmin, logout} = useWine()

    return(
        <>
        <header>
        <nav>
            <div className="logo">
                <img src="img/logo.png" alt="Logo" />
            </div>
            <div className="links">
            <NavLink to="/">Lista vini</NavLink>
            <NavLink to="/compare">Comparatore</NavLink>
            <NavLink to="/preferiti">Preferiti</NavLink>
            <NavLink to="/cantine">Lista cantine</NavLink>
            {isAdmin ? "" : <button onClick={() => navigate("/login")}>Login</button>}
            {isAdmin && <NavLink to = {"add-wine"}>Aggiungi Vino</NavLink>}
            {isAdmin && <NavLink to = {"add-winery"}>Aggiungi Cantina</NavLink>}
            {isAdmin && <button onClick={logout}>Logout</button>}
            </div>
        </nav>
        </header>
        </>
    )
}