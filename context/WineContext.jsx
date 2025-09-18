import { createContext, useContext, useEffect, useMemo, useState, } from "react"

const WineContext = createContext()

export const WineProvider = ({ children }) => {

    const [wines, setWines] = useState([])
    const [isAdmin , setIsAdmin] = useState(() => {
        const saved = localStorage.getItem("isAdmin")
        return saved ? true : false
    })

    const [wineToCompareId, setWineToCompareId] = useState(() => {
        const saved = localStorage.getItem("wineToCompare")
        return saved ? JSON.parse(saved) : []
    })

    const[favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites")
        return saved ? JSON.parse(saved) : []
    })
    

    const apiUrl = "http://localhost:3001/wines"

    // Recupero i dati dal mio API

    const fetchWine = async () => {
        try{
            const response = await fetch(apiUrl)
            const data = await response.json()
            setWines(data)
        }
        catch(error){
            console.error("Errore dutate il recupero dei dati dall'Api", error)
        }
    }

    useEffect(() => {
        fetchWine()
    }, [])



    // COMPARATORE
    const addCompare = (elem) => {
        if(wineToCompareId.includes(elem.id)){
            console.log("elemento già presente nella lista")
        }else{
            console.log("Aggiunto alla lista", elem.title)
            setWineToCompareId([...wineToCompareId, elem.id])
        }
    }
    // Salvo i prodotti da controntare nel local storage
    useEffect(() => {
        localStorage.setItem("wineToCompare", JSON.stringify(wineToCompareId))
    },[wineToCompareId])

    const clear = () => {
        setWineToCompareId([])
    }

    // FAVORITI
    const addFavorites = (elem) => {
        if(favorites.includes(elem.id)){
            console.log("elemento già presente nella lista")
        }else{
            console.log("Aggiunto alla lista", elem.title)
            setFavorites([...favorites, elem])
        }
    }
    // Salvo i prodotti da controntare nel local storage
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    },[favorites])



    // Log-in e stato admin
    const login = (username, password) => {
        const admin = {
            username: "admin",
            password: "admin123" 
        }

        if(username === admin.username && password === admin.password){
            setIsAdmin(true)
            localStorage.setItem("isAdmin" , "true")
            return true
        }else {
            alert("Username o password sbagliata")
            setIsAdmin(false)
            localStorage.setItem("isAdmin", "false")
            return false
        }

    }

    const logout = () => {
        setIsAdmin(false)
        localStorage.setItem("isAdmin", "false")
    }

    // Operazioni Admin Wine 

    const addWine = () => {
        console.log("Aggiunto nuovo vino")
    } 

    const removeWine = (id) => {
        console.log(`Vino con id: ${id} è stato rimosso`)
    }

    const updateWine = (id) => {
        console.log(`Vino con id: ${id} è stato modificato`)
    }


    return(
        <WineContext.Provider
        value = {{
            wineToCompareId: wineToCompareId,
            wines : wines,
            addCompare,
            addFavorites,
            favorites,
            clear,
            isAdmin,
            login,
            logout,
            addWine,
            removeWine,
            updateWine
        }}
        >
            {children}
        </WineContext.Provider>
    )
}

// Creo un hook personalizzato per il mio context che si chiamerà useTask()

export const useWine = () => useContext(WineContext)