import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export default function DettagliCantina() {
    const [winery, setwinery] = useState(null)

    const idParams = useParams()
    const id = parseInt(idParams.id)

    const fetchwinery = async () => {
        const response = await fetch(`http://localhost:3001/wineries/${id}`)
        const data = await response.json()
        setwinery(data.winery)
    }

    useEffect(() => {
        fetchwinery()
    }, [id])

    console.log(winery)
    return (
        <>
            <h1>Sono la pagina dei dettagli della cantina</h1>
            {winery && (
                <div>
                    <h3>{winery.title}</h3>
                    <p><strong>Categoria:</strong> {winery.category}</p>
                    <p><strong>Paese:</strong> {winery.country}</p>
                    <p><strong>Regione:</strong> {winery.region}</p>
                    <p><strong>Anno di fondazione:</strong> {winery.yearFounded}</p>
                    <p><strong>Ettari:</strong> {winery.hectares}</p>
                    <p><strong>Produzione annua:</strong> {winery.annualProduction}</p>
                    <p><strong>Vitigni:</strong> {winery.grapes.join(", ")}</p>

                    <div>
                        <h5>Premi e riconoscimenti</h5>
                        <p>{winery.awards.join(", ")}</p>
                    </div>

                    <div>
                        <h5>Note</h5>
                        <p>{winery.notes}</p>
                    </div>

                    <div>
                        <h5>Abbinamenti</h5>
                        <p>{winery.pairings.join(", ")}</p>
                    </div>

                    <div>
                        <h5>Sito ufficiale</h5>
                        <a href={winery.website} target="_blank" rel="noreferrer">
                            {winery.website}
                        </a>
                    </div>
                </div>
            )}
        </>
    )
}