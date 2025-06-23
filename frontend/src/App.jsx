import './index.css'
import ImagePage from './pages/imagePage.jsx'
import Signup from './pages/signup.jsx'
import Login from "./pages/login.jsx"
import {BrowserRouter, Routes , Route} from "react-router"

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/image' element={<ImagePage />}/>
    <Route path='/signup' element={<Signup />}/>
    <Route path='/login' element={<Login />}/>
    </Routes>
    </BrowserRouter>
  )
}
