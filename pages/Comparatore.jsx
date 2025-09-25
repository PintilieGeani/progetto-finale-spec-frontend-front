import { useEffect, useState } from "react"
import { useWine } from "../context/WineContext"
import { useWinery } from "../context/WineryContext"


export default function Comparatore() {
    const { wineToCompareId } = useWine()
    const { wineryToCompareId } = useWinery()
    const [wineCompareList, setWineCompareList] = useState([])
    const [wineryCompareList, setWineryCompareList] = useState([])

    console.log(wineryToCompareId)

    // Vini
    useEffect(() => {

        const promises = wineToCompareId.map((elem) =>
            fetch(`http://localhost:3001/wines/${elem.id}`)
        )


        Promise.all(promises)
            .then((response) => Promise.all(response.map((r) => r.json())))
            .then((wineData) => setWineCompareList(wineData.map((data) => data.wine)))
            .catch((error) => console.error("Errore nel recuper dei dati dei vini", error))
    }, [wineToCompareId])


    useEffect(() => {

        const promises = wineryToCompareId.map((elem) =>
            fetch(`http://localhost:3001/wineries/${elem.id}`)
        )


        Promise.all(promises)
            .then((response) => Promise.all(response.map((r) => r.json())))
            .then((wineryData) => setWineryCompareList(wineryData.map((data) => data.winery)))
            .catch((error) => console.error("Errore nel recuper dei dati delle cantine", error))
    }, [wineryToCompareId])

    console
    console.log(wineryCompareList)

    return (
        <>
            <div className="container">
                <h1 className="sottotitolo">Compara</h1>
                <div className="compare-card-container">
                    {wineCompareList && wineCompareList.map((wine, id) => (
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
                    {wineryCompareList && wineryCompareList.map((winery, id) => (
                        <div key={id} className="compare-card">
                            <div className="compare-card-text">
                                <h3>{winery.title}</h3>
                                <h5>Categoria: {winery.category}</h5>
                            </div>
                            <div className="compare-card-img">
                                <img src={`https://placehold.co/300x300?text=${winery.title}`} alt={winery.title} />
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
                    ))}
                </div>
            </div>
        </>
    )
}