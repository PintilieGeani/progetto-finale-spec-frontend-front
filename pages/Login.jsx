import { useState } from "react";
import { useWine } from "../context/WineContext";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const {login} = useWine()
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        const success = login(username, password)
        if(success) {
            navigate("/")
        }
        else{
            setUsername("")
            setPassword("")
        }
    }

    return (
        <div>
            <h1>Login Admin</h1>
            <label htmlFor="username">Username</label>
            <input type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Inserisci il tuo Username"
            />
            <label htmlFor="password">Password</label>
            <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Inserisci la tua password"
            />
            <button onClick={() => handleLogin(username, password)}>Entra come Admin</button>
        </div>
    )
}