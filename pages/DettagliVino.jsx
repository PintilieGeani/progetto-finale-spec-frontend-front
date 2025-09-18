import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { useWine } from "../context/WineContext";
import EditWineModal from "../components/EditWineModal";

export default function DettagliVino() {

    const [wine, setWine] = useState(null)
    const {isAdmin, updateWine} = useWine()
    const [showmodale, setShowModal] = useState(false)

    const idParams = useParams()
    const id = parseInt(idParams.id)

    const fetchwine = async () => {
        const response = await fetch(`http://localhost:3001/wines/${id}`)
        const data = await response.json()
        setWine(data.wine)
    }

    useEffect(() => {
        fetchwine()
    }, [id])


    return (
        <>
            <h1>Sono la pagina dei dettagli Vino</h1>

            {wine && <div>
                <h3>{wine.title}</h3>
                <p>Categoria:{wine.category}</p>
                <p>Cantina: {wine.winery}</p>
                <p>Paese di provenienza:{wine.country}</p>
                <p>Regione:{wine.region}</p>
                <p>Annata:{wine.vintage}</p>
                <p>Uva: {wine.grapes.join(" ")}</p>
                <div>
                    <h5>Caratteristiche</h5>
                    <p><strong>Corpo:</strong> {wine.body}</p>
                    <p><strong>Tannini:</strong> {wine.tannin}</p>
                    <p><strong>Acidità:</strong> {wine.acidity}</p>
                    <p><strong>Dolcezza:</strong> {wine.sweetness}</p>
                </div>
                {isAdmin && 
                <button onClick={() => setShowModal(true)}>Modifica Vino</button>
                }
            </div>}

             {showmodale && <div>
                <EditWineModal
                    wine={wine}
                    onClose={() => {
                        setShowModal(false)
                    }}
                    
                />
            </div>}

        </>
    )
}