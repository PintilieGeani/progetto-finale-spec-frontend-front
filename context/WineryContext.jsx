import { createContext, useContext, useEffect, useState, } from "react"

const WineryContext = createContext()

export  function WineryProvider ({children}) {

    const apiUrl = "http://localhost:3001/wineries"

    const [winerys, setWinerys] = useState([])

    useEffect(() => {
        const fetchWinerys = async () =>{
            try{
                const response = await fetch(apiUrl)
                if(response.ok){
                    const data = await response.json()
                    setWinerys(data)
                }else{
                    throw new Error ("Errore HTML:", response.status, response.statusText)
                }
            }
            catch(error){
                console.error("Errore durante il recupero dei dati dalla API")
            }
        }
        fetchWinerys()
    }, [])

    return (
        <WineryContext.Provider
        value={{
            winerys: winerys,
        }}
        >
            {children}
        </WineryContext.Provider>
    )
}

export const useWinery = () => useContext(WineryContext)