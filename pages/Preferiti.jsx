import { useState, useEffect } from "react"
import { useWine } from "../context/WineContext"
import { useWinery } from "../context/WineryContext"

export default function Preferiti() {
        
    const{ favorites, clear } = useWine()
    const {wineryFavorites} = useWinery()
    const [favoritesList, setFavoritesList] = useState([])
    const [wineryFavoritesList, setWineryFavoritesList] = useState([])


    // VINII
     useEffect(() => {
    
            const promises = favorites.map((elem) =>
                fetch(`http://localhost:3001/wines/${elem.id}`)
            )
    
    
            Promise.all(promises)
                .then((response) => Promise.all(response.map((r) => r.json())))
                .then((wineData) => setFavoritesList(wineData.map((data) => data.wine)))
                .catch((error) => console.error("Errore nel recuper dei dati dei vini", error))
        }, [favorites])



        // CANTINE
        useEffect(() => {
    
            const promises = wineryFavorites.map((elem) =>
                fetch(`http://localhost:3001/wineries/${elem.id}`)
            )
    
    
            Promise.all(promises)
                .then((response) => Promise.all(response.map((r) => r.json())))
                .then((wineryData) => setWineryFavoritesList(wineryData.map((data) => data.winery)))
                .catch((error) => console.error("Errore nel recupero delle cantine", error))
        }, [wineryFavorites])
    
        console.log(favoritesList)
        console.log(wineryFavoritesList)

    return(
        <>
        <div>
            <h1>Sono la pagina dei preferiti</h1>
        </div> 
        <h2>Vini</h2>
        <div className="favorites-card-container">
                {favoritesList.length > 0 ? 
                favoritesList.map((wine) => (
                    <div key={wine.id} className="compare-card">
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
                ))
                : <div>Nessun vino salvato tra i preferiti</div>}
            </div>
            <h2>Cantine</h2>
            <div className="favorites-card-container">
                {wineryFavoritesList.length > 0 ? 
                     wineryFavoritesList.map((winery) => (
                    <div key={winery.id} className="compare-card">
                        <div className="compare-card-text">
                            <h3>{winery.title}</h3>
                            <h5>Categoria: {winery.category}</h5>
                        </div>
                        <div className="compare-card-img">
                            <img src= {`https://placehold.co/300x300?text=${winery.title}`} alt={winery.title} />
                        </div>
                        <div className="compare-card-info">
                            <p>Paese: {winery.country}</p>
                            <p>Regione: {winery.region}</p>
                            <p>Anno di fondazione: {winery.yearFounded}</p>
                            <p>Ettari: {winery.hectares}</p>
                            <p>Produzione annua: {winery.annualProduction}</p>
                            <p>Vitigni: {winery.grapes.join(", ")}</p>
                        </div>
                        <div className="compare-card-carateristiche">
                            <h4>Premi e riconoscimenti</h4>
                            <p>{winery.awards.join(", ")}</p>
                        </div>
                        <div className="note-abbinamenti">
                            <h4>Note ed abbinamenti</h4>
                            <p>{winery.notes}</p>
                            <p>Da abbinare con: {winery.pairings.join(", ")}</p>
                        </div>
                        <div className="compare-card-link">
                            <a href={winery.website} target="_blank" rel="noreferrer">
                                Visita il sito
                            </a>
                        </div>
                    </div>
                ))
                : <div>Nessuna cantina salvata tra i preferiti</div>
            }
            </div>

            {/* <button onClick={clear}>Pulisci Storage</button> */}
        </>
    )
}