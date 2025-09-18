import { createContext, useContext, useEffect, useMemo, useState, } from "react"

const WineContext = createContext()

export const WineProvider = ({ children }) => {

    const [wines, setWines] = useState([])
    const [isAdmin, setIsAdmin] = useState(() => {
        const saved = localStorage.getItem("isAdmin")
        return saved === true ? true : false
    })

    const [wineToCompareId, setWineToCompareId] = useState(() => {
        const saved = localStorage.getItem("wineToCompare")
        return saved ? JSON.parse(saved) : []
    })

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites")
        return saved ? JSON.parse(saved) : []
    })


    const apiUrl = "http://localhost:3001/wines"

    // Recupero i dati dal mio API

    const fetchWine = async () => {
        try {
            const response = await fetch(apiUrl)
            const data = await response.json()
            setWines(data)
        }
        catch (error) {
            console.error("Errore dutate il recupero dei dati dall'Api", error)
        }
    }

    useEffect(() => {
        fetchWine()
    }, [])



    // COMPARATORE
    const addCompare = (elem) => {
        if (wineToCompareId.includes(elem.id)) {
            console.log("elemento già presente nella lista")
        } else {
            console.log("Aggiunto alla lista", elem.title)
            setWineToCompareId([...wineToCompareId, elem.id])
        }
    }
    // Salvo i prodotti da controntare nel local storage
    useEffect(() => {
        localStorage.setItem("wineToCompare", JSON.stringify(wineToCompareId))
    }, [wineToCompareId])

    const clear = () => {
        setWineToCompareId([])
    }

    // FAVORITI
    const addFavorites = (elem) => {
        if (favorites.includes(elem.id)) {
            console.log("elemento già presente nella lista")
        } else {
            console.log("Aggiunto alla lista", elem.title)
            setFavorites([...favorites, elem])
        }
    }
    // Salvo i prodotti da controntare nel local storage
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])



    // Log-in e stato admin
    const login = (username, password) => {
        const admin = {
            username: "admin",
            password: "admin123"
        }

        if (username === admin.username && password === admin.password) {
            setIsAdmin(true)
            localStorage.setItem("isAdmin", "true")
            return true
        } else {
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

    // Operazioni Admin Wine CRUD

    // Aggiunta
    const addWine = (obj) => {
        console.log("Aggiunto nuovo vino")
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
                    console.log("Vino aggiounto con successo")
                    setWines((prev) => [...prev, data.wine])
                })
        }
        catch (error) {
            console.error("Errore nel salvataggio del vino", error)
        }

    }

    // Eliminazione
    const removeWine = (id) => {
        console.log(`Vino con id: ${id} è stato rimosso`)
        try {
            fetch(`${apiUrl}/${id}`, { method: "DELETE" })
                .then(() => {
                    alert(`Vino con id ${id} è stato rimosso dalla lista`)
                    setWines((prev) => prev.filter((w) => w.id !== id))
                }
                )

        }
        catch (error) {
            console.error("Errore durante l'eliminazione del vino")
        }
    }

    // Modifica
    const updateWine = ( id , updatedWine ) => {
        console.log("sto per mandare alla fatch", updatedWine)
        try {
            fetch(`${apiUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedWine)
            })
            .then(res => {
                    if (!res.ok) throw new Error("Errore nell'update")
                    return res.json()
                })
             .then(data => {
                console.log(data)
                    alert("Vino modificato con successo")
                    setWines(prev => prev.map(w => w.id === id ? data.wine : w))
                })
        }
        catch (error) {
            console.error("Errore durante la modifica del vino", error)
        }

    }


    return (
        <WineContext.Provider
            value={{
                wineToCompareId: wineToCompareId,
                wines: wines,
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