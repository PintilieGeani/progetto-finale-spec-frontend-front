import { useWinery } from "../context/WineryContext"
import { Link } from "react-router-dom"

export default function ListaCantine() {
    const { winerys } = useWinery()
    console.log(winerys)

    return (
        <>
            <h1>Sono la lista delle cantine</h1>
            <table className="wine-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Azioni</th>
                        <th>Operazioni</th>
                    </tr>
                </thead>
                <tbody>
                    {winerys.map((winery) => (
                        <tr key={winery.id}>
                            <td>
                                <Link to={`/wine/${winery.id}`}>{winery.title}</Link>
                            </td>
                            <td>{winery.category}</td>
                            <td>
                                <button>Confronta</button>
                                <button>Aggiungi ai preferiti</button>
                            </td>
                            {/* {isAdmin &&
                                <td>
                                    <button onClick={() => {
                                        navigate(`/winery/${wine.id}`)
                                    }}>Modifica</button>
                                    <button >Elimina</button>
                                </td>
                            } */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}