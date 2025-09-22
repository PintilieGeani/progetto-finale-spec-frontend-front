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
        <div>
            <h2>Modifica Cantina</h2>
            <form onSubmit={handleSubmit}>
                <label>Nome</label>
                <input type="text" defaultValue={winery.title} ref={titleRef} />

                  <label>Categoria</label>
                <select defaultValue={winery.category} ref={categoryRef}>
                    <option value="Tradizionale">Tradizionale</option>
                    <option value="Industriale">Industriale</option>
                    <option value="Biodinamica">Biodinamica</option>
                    <option value="Naturale">Naturale</option>
                    <option value="Biologica">Biologica</option>
                </select>

                <label>Regione</label>
                <input type="text" defaultValue={winery.region} ref={regionRef} />

                <label>Paese</label>
                <input type="text" defaultValue={winery.country} ref={countryRef} />

                <label>Anno di fondazione</label>
                <input type="number" defaultValue={winery.yearFounded} ref={yearFoundedRef} />

                <label>Ettari</label>
                <input type="number" defaultValue={winery.hectares} ref={hectaresRef} />

                <label>Produzione annua</label>
                <input type="number" defaultValue={winery.annualProduction} ref={annualProductionRef} />

                <label>Vitigni (separati da virgola)</label>
                <input type="text" defaultValue={winery.grapes} ref={grapesRef} />

                <label>Premi (separati da virgola)</label>
                <input type="text" defaultValue={winery.awards} ref={awardsRef} />

                <label>Sito Web</label>
                <input type="text" defaultValue={winery.website} ref={websiteRef} />

                <label>URL immagine</label>
                <input type="text" defaultValue={winery.imageUrl} ref={imageUrlRef} />

                <label>Note</label>
                <textarea rows="3" defaultValue={winery.notes} ref={notesRef} />

                <label>Abbinamenti (separati da virgola)</label>
                <input type="text" defaultValue={winery.pairings} ref={pairingsRef} />

                <div>
                    <button type="submit">Salva</button>
                    <button type="button" onClick={onClose}>Annulla</button>
                </div>
            </form>
        </div>
    )
}