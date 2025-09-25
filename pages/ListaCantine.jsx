import { useWinery } from "../context/WineryContext"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useMemo, useCallback } from "react";
import { useWine } from "../context/WineContext";
import WineryCompareModal from "../components/WineryCompareModal";

function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}

export default function ListaCantine() {
    const { winerys, addCompare, addFavorites,  wineryToCompareId, setWineryToCompareId, wineryFavorites } = useWinery()
    const {isAdmin} = useWine()
    const [filteredWinerys, setFilteredWinerys] = useState([]);
    const [query, setQuery] = useState("")
    const [debouncedQuery, setDebouncedQuery] = useState("")
    const [sortBy, setSortBy] = useState("Categoria")
    const [sortOrder, setSortOrder] = useState(1)
    const [filtro, setFiltro] = useState("")
    const navigate = useNavigate()


    console.log(winerys)

    // DEBOUNCE

    const debounceQuery = useCallback(
        debounce((val) => setDebouncedQuery(val), 500),
        []
    )


    useEffect(() => {
        if (winerys.length > 0) {
            setFilteredWinerys(winerys);
        }
    }, [winerys]);



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
        let result = [...winerys]

        if (debouncedQuery.trim() !== "") {
            result = result.filter((w) =>
                w.title.toLowerCase().includes(debouncedQuery.toLowerCase())
            )
        }

        if (filtro !== "") {
            result = result.filter((w) => w.category === filtro)
        }

        setFilteredWinerys(result)
    }, [debouncedQuery, filtro, winerys])


    // Sorting
    const sortedWinerys = useMemo(() => {
        const statusOrder = {
            "Tradizionale": 0,
            "Industriale": 1,
            "Biodinamica": 2,
            "Naturale": 3,
            "Biologica": 4
        }


        const sorted = [...filteredWinerys].sort((a, b) => {
            let compare = 0;
            if (sortBy === "Nome") {
                compare = a.title.localeCompare(b.title);
            } else if (sortBy === "Categoria") {
                compare = statusOrder[a.category] - statusOrder[b.category];
            }

            return compare * sortOrder
        })

        return sorted

    }, [filteredWinerys, sortBy, sortOrder])

    useEffect(() => {
        setWineryToCompareId([])
    }, [])

    return (
        <>
            <div className="winery-hero">
                <h1 className="titolo">Le nostre cantine</h1>
            </div>
            <input className="search" type="text"
                value={query}
                placeholder="Cerca la tua cantina..."
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
                    <option value="Tradizionale">Tradizionale</option>
                    <option value="Industriale">Industriale</option>
                    <option value="Naturale">Naturale</option>
                    <option value="Biodinamica">Biodinamica</option>
                    <option value="Biologica">Biologica</option>
                </select>
            </div>
            <table className="wine-table">
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
                    {sortedWinerys.map((winery) => (
                        <tr key={winery.id}>
                            <td>
                                <Link to={`/cantine/${winery.id}`}>{winery.title}</Link>
                            </td>
                            <td>{winery.category}</td>
                            <td>
                                <button className={wineryToCompareId.some((e) => e.id === winery.id) ? "inCompare" : ""} onClick={() => addCompare(winery)}>Confronta</button>
                                <button className={wineryFavorites.some(fav => fav.id === winery.id) ? "inFavorites" : ""} onClick={() => addFavorites(winery)}>Aggiungi ai preferiti</button>
                            </td>
                            {isAdmin &&
                                <td>
                                    <button onClick={() => {
                                        navigate(`/cantine/${winery.id}`)
                                    }}>Modifica</button>
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>

             {wineryToCompareId.length > 0 && 
                            <WineryCompareModal 
                                data={winerys}
                                ids={wineryToCompareId}
                                onGo={() => navigate("/compare")}
                                onClose={() => {
                                    setWineryToCompareId([])
                                }}
                                />}
        </>
    )
}