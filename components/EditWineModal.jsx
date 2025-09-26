import { useRef } from "react"
import { useWine } from "../context/WineContext"

export default function EditWineModal({ show, wine, onClose, onSave }) {
    const titleRef = useRef()
    const categoryRef = useRef()
    const wineryRef = useRef()
    const regionRef = useRef()
    const countryRef = useRef()
    const grapesRef = useRef()
    const vintageRef = useRef()
    const abvRef = useRef()
    const sweetnessRef = useRef()
    const acidityRef = useRef()
    const bodyRef = useRef()
    const tanninRef = useRef()
    const priceRef = useRef()
    const scoreRef = useRef()
    const imageUrlRef = useRef()
    const notesRef = useRef()
    const pairingsRef = useRef()
    const appellationRef = useRef()
    const bottleSizeRef = useRef()
    const { updateWine } = useWine()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!titleRef.current.value.trim() || !isNaN(titleRef.current.value)) {
            alert("Inserire un nome valido!")
            return
        }

        const updatedWine = {
            title: titleRef.current.value,
            category: categoryRef.current.value,
            winery: wineryRef.current.value,
            region: regionRef.current.value,
            country: countryRef.current.value,
            grapes: grapesRef.current.value.split(",").map(g => g.trim()),
            vintage: parseInt(vintageRef.current.value),
            abv: parseFloat(abvRef.current.value),
            sweetness: parseInt(sweetnessRef.current.value),
            acidity: parseInt(acidityRef.current.value),
            body: parseInt(bodyRef.current.value),
            tannin: parseInt(tanninRef.current.value),
            priceEUR: parseFloat(priceRef.current.value),
            score: parseFloat(scoreRef.current.value),
            imageUrl: imageUrlRef.current.value,
            notes: notesRef.current.value,
            pairings: pairingsRef.current.value.split(",").map(p => p.trim()),
        }


        updateWine(wine.id, updatedWine)

    }


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Modifica Vino</h2>
                <form onSubmit={handleSubmit} className="modal-form">

                    <div className="form-grid">
                        <div className="form-group">
                            <label>Titolo</label>
                            <input type="text" defaultValue={wine.title} ref={titleRef} />
                        </div>

                        <div className="form-group">
                            <label>Categoria</label>
                            <select defaultValue={wine.category} ref={categoryRef}>
                                <option value="Rosso">Rosso</option>
                                <option value="Bianco">Bianco</option>
                                <option value="Rosé">Rosé</option>
                                <option value="Spumante">Spumante</option>
                                <option value="Dessert">Dessert</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Cantina</label>
                            <input type="text" defaultValue={wine.winery} ref={wineryRef} />
                        </div>

                        <div className="form-group">
                            <label>Regione</label>
                            <input type="text" defaultValue={wine.region} ref={regionRef} />
                        </div>

                        <div className="form-group">
                            <label>Paese</label>
                            <input type="text" defaultValue={wine.country} ref={countryRef} />
                        </div>

                        <div className="form-group">
                            <label>Uve</label>
                            <input type="text" defaultValue={wine.grapes} ref={grapesRef} />
                        </div>

                        <div className="form-group">
                            <label>Annata</label>
                            <input type="number" defaultValue={wine.vintage} ref={vintageRef} />
                        </div>

                        <div className="form-group">
                            <label>ABV (%)</label>
                            <input type="number" step="0.1" defaultValue={wine.abv} ref={abvRef} />
                        </div>

                        <div className="form-group">
                            <label>Dolcezza (1-5)</label>
                            <input type="number" min="1" max="5" defaultValue={wine.sweetness} ref={sweetnessRef} />
                        </div>

                        <div className="form-group">
                            <label>Acidità (1-5)</label>
                            <input type="number" min="1" max="5" defaultValue={wine.acidity} ref={acidityRef} />
                        </div>

                        <div className="form-group">
                            <label>Corpo (1-5)</label>
                            <input type="number" min="1" max="5" defaultValue={wine.body} ref={bodyRef} />
                        </div>

                        <div className="form-group">
                            <label>Tannini (1-5)</label>
                            <input type="number" min="1" max="5" defaultValue={wine.tannin} ref={tanninRef} />
                        </div>

                        <div className="form-group">
                            <label>Prezzo (€)</label>
                            <input type="number" step="0.01" defaultValue={wine.priceEUR} ref={priceRef} />
                        </div>

                        <div className="form-group">
                            <label>Punteggio</label>
                            <input type="number" step="0.1" defaultValue={wine.score} ref={scoreRef} />
                        </div>

                        <div className="form-group full">
                            <label>URL immagine</label>
                            <input type="text" defaultValue={wine.imageUrl} ref={imageUrlRef} />
                        </div>

                        <div className="form-group full">
                            <label>Note</label>
                            <textarea rows="3" defaultValue={wine.notes} ref={notesRef} />
                        </div>

                        <div className="form-group full">
                            <label>Abbinamenti</label>
                            <input type="text" defaultValue={wine.pairings} ref={pairingsRef} />
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