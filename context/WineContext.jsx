import { createContext, useContext, useEffect, useMemo, useState, } from "react"

const WineContext = createContext()

export const WineProvider = ({ children }) => {

    const [wines, setWines] = useState([])

    const [wineToCompareId, setWineToCompareId] = useState(() => {
        const saved = localStorage.getItem("wineToCompare")
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
    const addFavorites = () => {
        console.log("Agginto alla lista dei preferiti")
    }

    return(
        <WineContext.Provider
        value = {{
            wineToCompareId: wineToCompareId,
            wines : wines,
            addCompare,
            addFavorites,
            clear
        }}
        >
            {children}
        </WineContext.Provider>
    )
}

// Creo un hook personalizzato per il mio context che si chiamerà useTask()

export const useWine = () => useContext(WineContext)