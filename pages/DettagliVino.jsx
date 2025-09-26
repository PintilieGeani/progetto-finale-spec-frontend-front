import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { useWine } from "../context/WineContext";
import EditWineModal from "../components/EditWineModal";
import ModaleConferma from "../components/ModaleConferma";

export default function DettagliVino() {

    const [wine, setWine] = useState(null)
    const { isAdmin, updateWine, removeWine } = useWine()
    const [showmodale, setShowModal] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

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
            <div className="container">

                {wine && <div className="supercard">
                    <h1 className="sottotitolo">{wine.title}</h1>
                    <p className="categoria">Categoria: {wine.category}</p>
                    <div className="dettagli-img">
                    <img src= {`https://placehold.co/400x600/C5A46D/722F37?text=${wine.title}`}alt="" />
                    </div>
                    <div className="info">
                    <p>Cantina: {wine.winery}</p>
                    <p>Paese di provenienza: {wine.country}</p>
                    <p>Regione: {wine.region}</p>
                    <p>Annata: {wine.vintage}</p>
                    <p>Uva: {wine.grapes.join(" ")}</p>
                    </div>
                    <div className="carateristiche">
                        <p className="car-titolo">Caratteristiche</p>
                        <p><strong>Corpo:</strong> {wine.body}</p>
                        <p><strong>Tannini:</strong> {wine.tannin}</p>
                        <p><strong>Acidità:</strong> {wine.acidity}</p>
                        <p><strong>Dolcezza:</strong> {wine.sweetness}</p>
                    </div>
                    <div className="abinamenti">
                        <p  className="car-titolo">Abbinamenti</p>
                        <strong>Da abbinare con: </strong>{wine.pairings.join(", ")}
                        </div>
                    {isAdmin &&
                        <div className="dettagli-btns">
                            <button onClick={() => setShowModal(true)}>Modifica Vino</button>
                            <button onClick={() => setShowConfirm(true)}>Elimina</button>
                        </div>
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
                {showConfirm &&
                    <ModaleConferma
                        text={`Sicuro di volere eliminare ${wine.title}`}
                        onClose={() => setShowConfirm(false)}
                        onConfirm={() => removeWine(wine.id)}
                    />
                }

            </div>

        </>
    )
}