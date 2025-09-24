// IMPORTS
import { useCallback, useState, useEffect, useMemo, } from "react"
import { useWine } from "../context/WineContext"
import { Link, useNavigate } from "react-router-dom"
import ModaleConferma from "../components/ModaleConferma";


function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}

export default function ListaVini() {

    // Dati
    const { wines, addCompare, addFavorites, isAdmin, addWine, removeWine, updateWine } = useWine()
    const [filteredWines, setFilteredWines] = useState([]);
    const [query, setQuery] = useState("")
    const [debouncedQuery, setDebouncedQuery] = useState("")
    const [sortBy, setSortBy] = useState("Categoria")
    const [sortOrder, setSortOrder] = useState(1)
    const [filtro, setFiltro] = useState("")


    const navigate = useNavigate()



    // DEBOUNCE

    const debounceQuery = useCallback(
        debounce((val) => setDebouncedQuery(val), 500),
        []
    )


    useEffect(() => {
        if (wines.length > 0) {
            setFilteredWines(wines);
        }
    }, [wines]);


    //Ordina, crescente o decrescente se la colonna è  selezionata
    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder((cur) => -cur)
        } else {
            setSortBy(column);
            setSortOrder(1)
        }
    }


    // Filtro per categoria e query
    useEffect(() => {
        let result = [...wines]

        if (debouncedQuery.trim() !== "") {
            result = result.filter((w) =>
                w.title.toLowerCase().includes(debouncedQuery.toLowerCase())
            )
        }

        if (filtro !== "") {
            result = result.filter((w) => w.category === filtro)
        }

        setFilteredWines(result)
    }, [debouncedQuery, filtro, wines])


    // Sorting
    const sortedWines = useMemo(() => {
        const statusOrder = {
            "Rosso": 0,
            "Bianco": 1,
            "Rosé": 2,
            "Spumante": 3,
            "Dessert": 4
        }


        const sorted = [...filteredWines].sort((a, b) => {
            let compare = 0;
            if (sortBy === "Nome") {
                compare = a.title.localeCompare(b.title);
            } else if (sortBy === "Categoria") {
                compare = statusOrder[a.category] - statusOrder[b.category];
            }

            return compare * sortOrder
        })

        return sorted

    }, [filteredWines, sortBy, sortOrder])


    console.log(filteredWines)


    return (
        <>
            <div className="wine-hero">
                <h1 className="titolo">I nostri vini</h1>
            </div>
            <div className="container">
            <input className="search" type="text"
                value={query}
                placeholder="Cerca il tuo vino..."
                onChange={(e) => {
                    setQuery(e.target.value)
                    debounceQuery(e.target.value)
                }
                }
            />
            <div className="filtro">
                <label htmlFor="filter-category">Filtra per:</label>
                <select
                    onChange={(e) => setFiltro(e.target.value)}>
                    <option value="">Seleziona</option>
                    <option value="Rosso">Rosso</option>
                    <option value="Bianco">Bianco</option>
                    <option value="Rosé">Rosé</option>
                    <option value="Spumante">Spumante</option>
                    <option value="Dessert">Dessert</option>
                </select>
            </div>
            {sortedWines.length > 0
                ? <table className="wine-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("Nome")}>Nome</th>
                            <th onClick={() => handleSort("Categoria")}>Categoria</th>
                            <th>Azioni</th>
                            {isAdmin &&
                                <th>Operazioni</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {sortedWines.map((wine) => (
                            <tr key={wine.id}>
                                <td>
                                    <Link to={`/wine/${wine.id}`}>{wine.title}</Link>
                                </td>
                                <td>
                                    {/* {wine.category === "Rosso" && "🍷"}
                                    {wine.category === "Bianco" && "⚪"}
                                    {wine.category === "Rosé" && "🌸"}
                                    {wine.category === "Spumante" && "🍾"}
                                    {wine.category === "Dessert" && "🍰"} */}
                                    {wine.category}
                                </td>
                                <td>
                                    <button onClick={() => addCompare(wine)}>Confronta</button>
                                    <button onClick={() => addFavorites(wine)}>Aggiungi ai preferiti</button>
                                </td>
                                {isAdmin &&
                                    <td>
                                        <button onClick={() => {
                                            navigate(`/wine/${wine.id}`)
                                        }}>Modifica</button>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
                : <div>Nessun vino trovato</div>}
            </div>

        </>
    )
}