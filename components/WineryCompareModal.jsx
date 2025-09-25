import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWinery } from "../context/WineryContext";

export default function WineryCompareModal({onGo, onClose }) {

    const {wineryToCompareId, setWineryToCompareId} = useWinery()

    const remove = (id) => {
        setWineryToCompareId(wineryToCompareId.filter((e) => e.id !== id))
    }
    

    return (

        <div className="compare-modal">
            <h1 className="compare-title">Comparatore</h1>
            <div className="compare-content">
                <ul className="compare-list">
                    {wineryToCompareId.map((item) => (
                        <li key={item.id}>{item.title}
                            <button className="btn-close" onClick={() => remove(item.id)}> - </button>
                        </li>
                    ))}
                </ul>
                <div className="compare-actions">
                    <button className="btn-go" onClick={onGo}>Confronta</button>
                    <button className="btn-close" onClick={onClose}>Anulla</button>
                </div>
            </div>
        </div>
    )
}