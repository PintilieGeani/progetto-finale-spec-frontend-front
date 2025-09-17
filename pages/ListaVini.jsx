// IMPORTS
import { useCallback, useState, useEffect, useMemo } from "react"
import { useWine } from "../context/WineContext"
import { Link } from "react-router-dom"

function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}

export default function ListaVini() {

    // Dati
    const { wines, addCompare, addFavorites, wineToCompareId, favorites } = useWine()
    const [filteredWines, setFilteredWines] = useState([]);
    const [query, setQuery] = useState("")
    const [sortBy, setSortBy] = useState("Categoria")
    const [sortOrder, setSortOrder] = useState(1)


    // DEBOUNCE


    const handleSearch = (query) => {
        const result = wines.filter((w) =>
            w.title.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredWines(result)
    }

    const debouncedSearch = useCallback(debounce((query) => {
        const result = wines.filter((w) =>
            w.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredWines(result);
    }, 500), [wines]);


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


    console.log(favorites)


    return (
        <>
            <h1>Sono la lista dei vini</h1>
            <input type="text"
                value={query}
                placeholder="Cerca il tuo vino..."
                onChange={(e) => {
                    setQuery(e.target.value)
                    debouncedSearch(e.target.value)
                }
                }
            />
            {wines && <table className="wine-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort("Nome")}>Nome</th>
                        <th onClick={() => handleSort("Categoria")}>Categoria</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedWines.map((wine) => (
                        <tr key={wine.id}>
                            <td>
                                <Link to={`/wine/${wine.id}`}>{wine.title}</Link>
                            </td>
                            <td>{wine.category}</td>
                            <td>
                                <button onClick={() => addCompare(wine)}>Confronta</button>
                                <button onClick={() => addFavorites(wine)}>Aggiungi ai preferiti</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            }

        </>
    )
}