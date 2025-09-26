import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useWine } from "../context/WineContext"
import EditWineryModal from "../components/EditWineryModal"
import ModaleConferma from "../components/ModaleConferma";
import { useWinery } from "../context/WineryContext";

export default function DettagliCantina() {
    const [winery, setwinery] = useState(null)
    const { isAdmin } = useWine()
    const{removeWinery} = useWinery()
    const idParams = useParams()
    const id = parseInt(idParams.id)
    const [showmodal, setShowModal] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    // Da fare try and catch


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
            {winery && (
                <div className="supercard">
                    <h1 className="sottotitolo">{winery.title}</h1>
                    <p className="categoria"><strong>Categoria:</strong> {winery.category}</p>
                    <div className="dettagli-img">
                    <img src= {`https://placehold.co/400x600/C5A46D/722F37?text=${winery.title}`}alt="" />
                    </div>
                    <div className="info">
                    <p><strong>Paese:</strong> {winery.country}</p>
                    <p><strong>Regione:</strong> {winery.region}</p>
                    <p><strong>Anno di fondazione:</strong> {winery.yearFounded}</p>
                    <p><strong>Ettari:</strong> {winery.hectares}</p>
                    <p><strong>Produzione annua:</strong> {winery.annualProduction}</p>
                    <p><strong>Vitigni:</strong> {winery.grapes.join(", ")}</p>
                    </div>

                    <div className="carateristiche">
                        <h5 className="categoria">Premi e riconoscimenti</h5>
                        <p>{winery.awards.join(", ")}</p>
                    </div>

                    <div className="carateristiche">
                        <h5 className="categoria">Note</h5>
                        <p>{winery.notes}</p>
                    </div>

                    <div className="carateristiche">
                        <h5 className="categoria">Abbinamenti</h5>
                        <p>{winery.pairings.join(", ")}</p>
                    </div>

                    <div className="carateristiche">
                        <h5 className="categoria">Sito ufficiale</h5>
                        <a  href={winery.website} target="_blank" rel="noreferrer">
                            {winery.website}
                        </a>
                    </div>
                    {isAdmin &&
                        <div className="dettagli-btns">
                            <button onClick={() => setShowModal(true)}>Modifica Cantina</button>
                            <button onClick={() => setShowConfirm(true)}>Elimina</button>
                        </div>
                    }
                </div>
            )}
            {showmodal && <div>
                <EditWineryModal
                    winery={winery}
                    onClose={() => {
                        setShowModal(false)
                    }}
                />
            </div>}
            {showConfirm &&
                        <ModaleConferma
                        text={`Sicuro di volere eliminare ${winery.title}`}
                        onClose={() => setShowConfirm(false)}
                        onConfirm={() => removeWinery(winery.id)}
                        />
                        }

        </>
    )
}