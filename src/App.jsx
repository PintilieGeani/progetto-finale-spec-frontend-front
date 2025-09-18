import { Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout.jsx";
import ListaVini from "../pages/ListaVini.jsx"
import Comparatore from "../pages/Comparatore.jsx";
import DettagliVino from "../pages/DettagliVino.jsx"
import Preferiti from "../pages/Preferiti.jsx";
import Login from "../pages/Login.jsx";
import AddWine from "../pages/AddWine.jsx";


function App() {

  // const apiUrl = "http://localhost:3001/wines"

  // const fetchApi = async () => {
  //       const response = await fetch(apiUrl)
  //       const data = await response.json()
  //       console.log(data)
  // }

  // fetchApi()

  return (
    <>
      <Routes>
        {/* Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<ListaVini />} />
          <Route path="/compare" element={<Comparatore />} />
          <Route path="/wine/:id" element={<DettagliVino />} />
          <Route path="/preferiti" element={<Preferiti />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-wine" element={<AddWine />} />
        </Route>
        {/* Fine Layout */}
      </Routes>
    </>
  )
}

export default App
