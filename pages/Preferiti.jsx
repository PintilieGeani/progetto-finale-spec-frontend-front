import { useState, useEffect } from "react"
import { useWine } from "../context/WineContext"

export default function Preferiti() {
        
    const{ favorites, clear } = useWine()
    const [favoritesList, setFavoritesList] = useState([])

     useEffect(() => {
    
            const promises = favorites.map((elem) =>
                fetch(`http://localhost:3001/wines/${elem.id}`)
            )
    
    
            Promise.all(promises)
                .then((response) => Promise.all(response.map((r) => r.json())))
                .then((wineData) => setFavoritesList(wineData.map((data) => data.wine)))
                .catch((error) => console.error("Errore nel recuper dei dati dei vini", error))
        }, [favorites])
    
        console.log(favoritesList)

    return(
        <>
        <div>
            <h1>Sono la pagina dei preferiti</h1>
        </div> 
        <div className="favorites-card-container">
                {favoritesList.length > 0 ? favoritesList.map((wine, id) => (
                    <div key={id} className="compare-card">
                        <div className="compare-card-text">
                            <h3>{wine.title}</h3>
                            <h5>Categoria: {wine.category}</h5>
                        </div>
                        <div className="compare-card-img">
                            <img src={wine.imageUrl} alt={wine.name} />
                        </div>
                        <div className="compare-card-info">
                            <p>Paese di Provenienza: {wine.country}</p>
                            <p>Regione: {wine.region}</p>
                            <p>Cantina: <strong>{wine.winery}</strong></p>
                            <p>Annatta: {wine.vintage}</p>
                            <p>Uva: {wine.grapes.join(", ")}</p>
                        </div>
                        <div className="compare-card-carateristiche">
                            <h4>Caratteristiche</h4>
                            <p>Corpo: {wine.body}/5</p>
                            <p>Tannini: {wine.tannin}/5</p>
                            <p>Acidità: {wine.acidity}/5</p>
                            <p>Dolcezza: {wine.sweetness}/5</p>
                        </div>
                        <div className="note-abbinamenti">
                            <h4>Note ed abbinamenti</h4>
                            <p>{wine.note}</p>
                            <p>Da abbinare con: {wine.pairings.join(", ")}</p>
                        </div>
                    </div>
                )) : <div>Nessun articolo tra i preferiti</div>} 
            </div>

            {/* <button onClick={clear}>Pulisci Storage</button> */}
        </>
    )
}