export default function ModaleConferma({text, onConfirm, onClose}){
    return(
        <>
        <div className="modal-overlay">
        <div className="modal">
            <h2>{text}</h2>
            <button onClick={onConfirm}>Conferma</button>
            <button onClick={onClose}>Anulla</button>
        </div>
        </div>
        </>

    )
}