import { useRef } from "react"
import { useWinery } from "../context/WineryContext"

export default function AddWinery() {
    const { addWinery } = useWinery()

    // Ref del form
    const titolo = useRef()
    const categoria = useRef()
    const regione = useRef()
    const paese = useRef()
    const annoFondazione = useRef()
    const ettari = useRef()
    const produzioneAnnua = useRef()
    const vitigni = useRef()
    const premi = useRef()
    const sitoWeb = useRef()
    const immagine = useRef()
    const note = useRef()
    const abbinamenti = useRef()

    // funzione handle submit
    const handleSubmit = (e) => {
        e.preventDefault()

        const newWinery = {
            title: titolo.current.value,
            category: categoria.current.value,
            region: regione.current.value,
            country: paese.current.value,
            yearFounded: parseInt(annoFondazione.current.value),
            hectares: parseInt(ettari.current.value),
            annualProduction: parseInt(produzioneAnnua.current.value),
            grapes: vitigni.current.value.split(",").map(g => g.trim()),
            awards: premi.current.value.split(",").map(p => p.trim()),
            website: sitoWeb.current.value,
            imageUrl: immagine.current.value,
            notes: note.current.value,
            pairings: abbinamenti.current.value.split(",").map(p => p.trim())
        }

        addWinery(newWinery)
    }

    return (
        <>
            <h1>Sono la pagina di aggiunta Cantina</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Nome</label>
                    <input ref={titolo} type="text" name="title" />

                    <label>Categoria</label>
                    <select ref={categoria}>
                        <option value="Tradizionale">Tradizionale</option>
                        <option value="Industriale">Industriale</option>
                        <option value="Biodinamica">Biodinamica</option>
                        <option value="Naturale">Naturale</option>
                        <option value="Biologica">Biologica</option>
                    </select>

                    <label>Regione</label>
                    <input ref={regione} type="text" name="region" />

                    <label>Paese</label>
                    <input ref={paese} type="text" name="country" />

                    <label>Anno di fondazione</label>
                    <input ref={annoFondazione} type="number" name="yearFounded" />

                    <label>Ettari</label>
                    <input ref={ettari} type="number" name="hectares" />

                    <label>Produzione annua</label>
                    <input ref={produzioneAnnua} type="number" name="annualProduction" />

                    <label>Vitigni (separati da virgola)</label>
                    <input ref={vitigni} type="text" name="grapes" />

                    <label>Premi (separati da virgola)</label>
                    <input ref={premi} type="text" name="awards" />

                    <label>Sito web</label>
                    <input ref={sitoWeb} type="text" name="website" />

                    <label>URL immagine</label>
                    <input ref={immagine} type="text" name="imageUrl" />

                    <label>Note</label>
                    <textarea ref={note} name="notes" rows="3" />

                    <label>Abbinamenti (separati da virgola)</label>
                    <input ref={abbinamenti} type="text" name="pairings" />

                    <button type="submit">Aggiungi Cantina</button>
                </form>
            </div>
        </>
    )
}