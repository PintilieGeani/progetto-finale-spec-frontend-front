import { useRef } from "react"
import { useWinery } from "../context/WineryContext"

export default function EditWineryModal({ show, winery, onClose, onSave }) {
    const titleRef = useRef()
    const categoryRef = useRef()
    const regionRef = useRef()
    const countryRef = useRef()
    const yearFoundedRef = useRef()
    const hectaresRef = useRef()
    const annualProductionRef = useRef()
    const grapesRef = useRef()
    const awardsRef = useRef()
    const websiteRef = useRef()
    const imageUrlRef = useRef()
    const notesRef = useRef()
    const pairingsRef = useRef()

    const { updateWinery } = useWinery()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!titleRef.current.value.trim() || !isNaN(titleRef.current.value)) {
            alert("Inserire un nome valido!")
            return
        }

        const updatedWinery = {
            title: titleRef.current.value,
            category: categoryRef.current.value,
            region: regionRef.current.value,
            country: countryRef.current.value,
            yearFounded: parseInt(yearFoundedRef.current.value),
            hectares: parseInt(hectaresRef.current.value),
            annualProduction: parseInt(annualProductionRef.current.value),
            grapes: grapesRef.current.value.split(",").map(g => g.trim()),
            awards: awardsRef.current.value.split(",").map(a => a.trim()),
            website: websiteRef.current.value,
            imageUrl: imageUrlRef.current.value,
            notes: notesRef.current.value,
            pairings: pairingsRef.current.value.split(",").map(p => p.trim())
        }

        updateWinery(winery.id, updatedWinery)
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Modifica Cantina</h2>
                <form onSubmit={handleSubmit} className="modal-form">

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" defaultValue={winery.title} ref={titleRef} />
                        </div>

                        <div className="form-group">
                            <label>Categoria</label>
                            <select defaultValue={winery.category} ref={categoryRef}>
                                <option value="Tradizionale">Tradizionale</option>
                                <option value="Industriale">Industriale</option>
                                <option value="Biodinamica">Biodinamica</option>
                                <option value="Naturale">Naturale</option>
                                <option value="Biologica">Biologica</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Regione</label>
                            <input type="text" defaultValue={winery.region} ref={regionRef} />
                        </div>

                        <div className="form-group">
                            <label>Paese</label>
                            <input type="text" defaultValue={winery.country} ref={countryRef} />
                        </div>

                        <div className="form-group">
                            <label>Anno di fondazione</label>
                            <input type="number" defaultValue={winery.yearFounded} ref={yearFoundedRef} />
                        </div>

                        <div className="form-group">
                            <label>Ettari</label>
                            <input type="number" defaultValue={winery.hectares} ref={hectaresRef} />
                        </div>

                        <div className="form-group">
                            <label>Produzione annua</label>
                            <input type="number" defaultValue={winery.annualProduction} ref={annualProductionRef} />
                        </div>

                        <div className="form-group">
                            <label>Vitigni (separati da virgola)</label>
                            <input type="text" defaultValue={winery.grapes} ref={grapesRef} />
                        </div>

                        <div className="form-group">
                            <label>Premi (separati da virgola)</label>
                            <input type="text" defaultValue={winery.awards} ref={awardsRef} />
                        </div>

                        <div className="form-group full">
                            <label>Sito Web</label>
                            <input type="text" defaultValue={winery.website} ref={websiteRef} />
                        </div>

                        <div className="form-group full">
                            <label>URL immagine</label>
                            <input type="text" defaultValue={winery.imageUrl} ref={imageUrlRef} />
                        </div>

                        <div className="form-group full">
                            <label>Note</label>
                            <textarea rows="3" defaultValue={winery.notes} ref={notesRef} />
                        </div>

                        <div className="form-group full">
                            <label>Abbinamenti (separati da virgola)</label>
                            <input type="text" defaultValue={winery.pairings} ref={pairingsRef} />
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="submit" className="btn-danger">Salva</button>
                        <button type="button" onClick={onClose} className="btn-danger">Annulla</button>
                    </div>
                </form>
            </div>
        </div>
    )
}