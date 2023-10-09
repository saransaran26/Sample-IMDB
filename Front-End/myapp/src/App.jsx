import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Routes,Route } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Editnotes from './Editnotes';
import Alldatas from './Alldatas';

function App() {
  const [movieslist,setmovielist] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:3000/api/movies")
    .then((res)=>setmovielist(res.data))
    .catch((err)=>console.log(err))
  },[])
  return (
  
  <Routes>
    <Route exact path='/' element={<Alldatas movieslist={movieslist} setmovielist={setmovielist}></Alldatas>}></Route>
    <Route path='/edit/:id' element={<Editnotes movieslist={movieslist} setmovielist={setmovielist}></Editnotes>}></Route>
  </Routes>
  
    
    
  )
}

export default App
