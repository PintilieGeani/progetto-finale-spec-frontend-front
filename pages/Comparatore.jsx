import { useEffect, useState } from "react"
import { useWine } from "../context/WineContext"


export default function Comparatore() {
    const { wineToCompareId, clear } = useWine()
    const [compareList, setCompareList] = useState([])
    console.log(wineToCompareId)


    useEffect(() => {

        const promises = wineToCompareId.map((id) =>
            fetch(`http://localhost:3001/wines/${id}`)
        )


        Promise.all(promises)
            .then((response) => Promise.all(response.map((r) => r.json())))
            .then((wineData) => setCompareList(wineData.map((data) => data.wine)))
            .catch((error) => console.error("Errore nel recuper dei dati dei vini", error))
    }, [wineToCompareId])

    console.log(compareList)


    return (
        <>
            <h1>Sono la pagina del comparatore</h1>
            <div className="compare-card-container">
                {compareList && compareList.map((wine, id) => (
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
                ))}
            </div>

            <button onClick={clear}>Pulisci Storage</button>
        </>
    )
}