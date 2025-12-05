import { useState } from 'react'
import { Route ,Routes} from 'react-router-dom'
import './App.css'
import NavBar from "./com/Nav.jsx";
import Home from "./com/Home.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <NavBar></NavBar>

        <Routes>
            <Route path='/login'  element={<p>welcome to login</p>} />
            <Route path='/about'  element={<p>welcome to about</p>} />

            <Route path='/register'  element={<p>welcome to register</p>} />
            <Route path='/'  element={<Home/>} />

        </Routes>
    </>
  )
}

export default App
