import { useState } from 'react'
import { Route ,Routes} from 'react-router-dom'
import './App.css'
import NavBar from "./com/Nav.jsx";
import Home from "./com/Home.jsx";
import login from "./com/Login.jsx";
import Login from "./com/Login.jsx";
import Register from "./com/Register.jsx";
import About from "./com/About.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <NavBar></NavBar>

        <Routes>
            <Route path='/login'  element={<Login/>}/>
            <Route path='/about'  element={<About/>} />

            <Route path='/register'  element={<Register/>} />
            <Route path='/'  element={<Home/>} />

        </Routes>
    </>
  )
}

export default App
