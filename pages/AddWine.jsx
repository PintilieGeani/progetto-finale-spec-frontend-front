import { useWine } from "../context/WineContext"
import { useState, useRef } from "react"

export default function AddWine() {

    const{addWine} = useWine()

    // Ref del form
    const titolo = useRef()
    const categoria = useRef()
    const cantina = useRef()
    const regione = useRef()
    const paese = useRef()
    const uve = useRef()
    const annata = useRef()
    const abv = useRef()
    const dolcezza = useRef()
    const acidità = useRef()
    const corpo = useRef()
    const tannini = useRef()
    const prezzo = useRef()
    const punteggio = useRef()
    const immagine = useRef()
    const note = useRef()
    const abbinamenti = useRef()
    const denominazione = useRef()
    const bottiglia = useRef()


    // funzione handle submit
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!titolo.current.value.trim() || !isNaN(titolo.current.value)) {
            alert("Inserire un nome valido!")
            return
        }

        const newWine = {
            title: titolo.current.value,
            category: categoria.current.value,
            winery: cantina.current.value,
            region: regione.current.value,
            country: paese.current.value,
            grapes: uve.current.value.split(",").map(u => u.trim()),
            vintage: parseInt(annata.current.value),
            abv: parseFloat(abv.current.value),
            sweetness: parseInt(dolcezza.current.value),
            acidity: parseInt(acidità.current.value),
            body: parseInt(corpo.current.value),
            tannin: parseInt(tannini.current.value),
            priceEUR: parseFloat(prezzo.current.value),
            score: parseFloat(punteggio.current.value),
            notes: note.current.value,
            pairings: abbinamenti.current.value.split(",").map(p => p.trim()),

            // readonly (vengono salvate solo alla creazione)
            appellation: denominazione.current.value,
            bottleSizeMl: parseInt(bottiglia.current.value)
        }

        addWine(newWine)
    }




    return (
        <>
            <h1>Sono la pagina di aggiunta Vino</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Titolo</label>
                    <input ref={titolo} type="text" name="title" />

                    <label>Categoria</label>
                    <select ref={categoria} name="category">
                        <option value="">Seleziona una categoria</option>
                        <option value="Rosso">Rosso</option>
                        <option value="Bianco">Bianco</option>
                        <option value="Rosé">Rosé</option>
                        <option value="Spumante">Spumante</option>
                        <option value="Dessert">Dessert</option>
                    </select>

                    <label>Cantina</label>
                    <input type="text" name="winery" ref={cantina} />

                    <label>Regione</label>
                    <input type="text" name="region" ref={regione} />

                    <label>Paese</label>
                    <input type="text" name="country" ref={paese} />

                    <label>Uve (separate da virgola)</label>
                    <input type="text" name="grapes" ref={uve} />

                    <label>Annata</label>
                    <input type="number" name="vintage" ref={annata} />

                    <label>Gradazione alcolica (ABV)</label>
                    <input type="number" step="0.1" name="abv" ref={abv} />

                    <label>Dolcezza (1-5)</label>
                    <input type="number" min="1" max="5" name="sweetness" ref={dolcezza} />

                    <label>Acidità (1-5)</label>
                    <input type="number" min="1" max="5" name="acidity" ref={acidità} />

                    <label>Corpo (1-5)</label>
                    <input type="number" min="1" max="5" name="body" ref={corpo} />

                    <label>Tannini (1-5)</label>
                    <input type="number" min="1" max="5" name="tannin" ref={tannini} />

                    <label>Prezzo (€)</label>
                    <input type="number" step="0.01" name="priceEUR" ref={prezzo} />

                    <label>Punteggio</label>
                    <input type="number" name="score" ref={punteggio} />

                    <label>URL immagine</label>
                    <input type="text" name="imageUrl" ref={immagine} />

                    <label>Note</label>
                    <textarea name="notes" rows="3" ref={note} />

                    <label>Abbinamenti (separati da virgola)</label>
                    <input type="text" name="pairings" ref={abbinamenti} />

                    <label>Denominazione (Appellation)</label>
                    <input type="text" name="appellation" ref={denominazione} />

                    <label>Formato bottiglia (ml)</label>
                    <input type="number" name="bottleSizeMl" ref={bottiglia} />

                    <button type="submit">Aggiungi Vino</button>
                </form>
            </div>
        </>
    )
}