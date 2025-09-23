import { createContext, useContext, useEffect, useState, } from "react"
import { useNavigate } from "react-router-dom"

const WineryContext = createContext()

export  function WineryProvider ({children}) {

    const apiUrl = "http://localhost:3001/wineries"

    const [winerys, setWinerys] = useState([])
    const [wineryToCompareId, setWineryToCompareId] = useState([])
    const[wineryFavorites, setWineryFavorites] = useState(() => {
        const saved = localStorage.getItem("wineryFavorites")
        return saved ? JSON.parse(saved) : []
    })
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWinerys = async () =>{
            try{
                const response = await fetch(apiUrl)
                if(response.ok){
                    const data = await response.json()
                    setWinerys(data)
                }else{
                    throw new Error ("Errore HTML:", response.status, response.statusText)
                }
            }
            catch(error){
                console.error("Errore durante il recupero dei dati dalla API")
            }
        }
        fetchWinerys()
    }, [])


        // COMPARATORE
    const addCompare = (elem) => {
        if (wineryToCompareId.includes(elem.id)) {
            console.log("elemento già presente nella lista")
        } else {
            console.log("Aggiunto alla lista", elem.title)
            setWineryToCompareId([...wineryToCompareId, elem.id])
        }
    }

    // FAVORITI
    const addFavorites = (elem) => {
        if (wineryFavorites.includes(elem.id)) {
            console.log("elemento già presente nella lista")
        } else {
            console.log("Aggiunto alla lista", elem.title)
            setWineryFavorites([...wineryFavorites, elem])
        }
    }

      useEffect(() => {
        localStorage.setItem("wineryFavorites", JSON.stringify(wineryFavorites))
    }, [wineryFavorites])


    // CRUD

     // Aggiunta
    const addWinery = (obj) => {
        console.log("Aggiunto nuova Cantina")
        try {
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error("Errore nella Post")
                    }
                    return res.json()
                })
                .then(data => {
                    alert("Dati mandati con successo")
                    console.log("Cantina aggiounta con successo")
                    setWinerys((prev) => [...prev, data.winery])
                    navigate("/cantine")
                })
        }
        catch (error) {
            console.error("Errore nel salvataggio del vino", error)
        }

    }

     // Eliminazione
    const removeWinery = (id) => {
        console.log(`Cantina con id: ${id} è stato rimossa`)
        try {
            fetch(`${apiUrl}/${id}`, { method: "DELETE" })
                .then(() => {
                    alert(`Cantina rimossa con successo`)
                    setWinerys((prev) => prev.filter((w) => w.id !== id))
                    navigate("/cantine")
                }
                )

        }
        catch (error) {
            console.error("Errore durante l'eliminazione della cantina")
        }
    }
    
    // Aggiornamento
    const updateWinery = (id, updatedWinery) => {
        console.log("sto per mandare alla fatch", updatedWinery)
        try {
            fetch(`${apiUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedWinery)
            })
            .then(res => {
                    if (!res.ok) throw new Error("Errore nell'update")
                    return res.json()
                })
             .then(data => {
                console.log(data)
                    alert("Cantina modificata con successo")
                    setWinerys(prev => prev.map(w => w.id === id ? data.winery : w))
                    navigate(`/cantine`)
                })
        }
        catch (error) {
            console.error("Errore durante la modifica della cantina", error)
        }
    }
    


    return (
        <WineryContext.Provider
        value={{
            winerys: winerys,
            wineryToCompareId: wineryToCompareId,
            wineryFavorites: wineryFavorites,
            addCompare,
            addFavorites,
            addWinery,
            updateWinery,
            removeWinery
        }}
        >
            {children}
        </WineryContext.Provider>
    )
}

export const useWinery = () => useContext(WineryContext)