import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar";
import Body from "./components/Body";


function App() {
  const [darkMode,setDarkMode] = useState(localStorage.getItem("firke")==="true");
  

 function changetheme()
 {
  localStorage.setItem("firke",!darkMode);
  setDarkMode((prev)=>!prev );
 }
 return(
  <>
<Navbar dabba={darkMode} changetheme={changetheme} />
<Body darkMode={darkMode}/>
  </>
 )}
export default App