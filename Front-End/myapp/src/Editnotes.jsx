import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alldatas from './Alldatas';

function Editnotes({movieslist,setmovielist}) {
    const {id} = useParams()
    const[title,settitle] = useState("")
  const[year,setyear] = useState("")
  const[runtime,setruntime] = useState("")
  const[writer,setwriter] = useState("")
  const[actor,setactor] = useState("")
  const[msg,setmsg] = useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
    const data = movieslist.find((datas)=>datas._id === id)
    if(data){
        settitle(data.title)
        setyear(data.year)
        setruntime(data.runtime)
        setwriter(data.writer)
        setactor(data.actor)
    }
  },[id])

  async function handledits(){
    const updatededits = {
        title:title,
      year:year,
      runtime:runtime,
      writer:writer,
      actor:actor
    }
  
    axios.put(`http://localhost:3000/api/movie/${id}`,updatededits)
    .then((res)=>{
        const findindex = movieslist.findindex((data)=>data._id === id)
        movieslist[findindex] = res.data
        setmovielist([...movieslist])
    })
    .catch((err)=>console.log(err))

}


   
  
  return (
    <div>
    <div className='heading'>FSD IMDB clone</div>
    <div className="container mt-5">
        <div className='d-flex justify-content-center'>
        <button className='btn btn-dark' onClick={()=>navigate('/')}>Go to Home</button>
        </div>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label className='mt-3'>Title :</Form.Label>
        <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e)=>settitle(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Year :</Form.Label>
        <Form.Control type="text" placeholder="Enter Year" value={year} onChange={(e)=>setyear(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Runtime :</Form.Label>
        <Form.Control type="text" placeholder="Enter Runtime" value={runtime} onChange={(e)=>setruntime(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Writer :</Form.Label>
        <Form.Control type="text" placeholder="Enter writer" value={writer} onChange={(e)=>setwriter(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Actor :</Form.Label>
        <Form.Control type="text" placeholder="Enter Actor" value={actor} onChange={(e)=>setactor(e.target.value)}/>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handledits}>
        Edit Notes
      </Button>
    </Form>
    {msg ? <h4 className='mt-5'>Succesfully updated</h4>:""}
    </div>
    </div>
  )
}

export default Editnotes