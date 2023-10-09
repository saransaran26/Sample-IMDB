import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Modal } from 'bootstrap';

function Alldatas({movieslist,setmovielist}) {
    
    const[title,settitle] = useState("")
    const[year,setyear] = useState("")
    const[runtime,setruntime] = useState("")
    const[writer,setwriter] = useState("")
    const[actor,setactor] = useState("")
    const navigate = useNavigate()
    const[msg,setmsg] = useState(false)
    
    
  
     function handlesubmit(){
      const updateddata = {
        title:title,
        year:year,
        runtime:runtime,
        writer:writer,
        actor:actor
      }
      axios.post('http://localhost:3000/api/movies',updateddata)
      .then((res)=>setmovielist(res.data))
      .catch((err)=>console.log(err))
     }
  
     
  
     const handledelete = async (id)=>{
      axios.delete(`http://localhost:3000/api/movie/${id}`)
      .then(()=>{
        const findindex = movieslist.findindex((data)=>data._id === id)
        const deletednotes = movieslist.slice(index,1)
        setusernotes([...movieslist])
        // setmsg(true)
      })
      .catch((err)=>console.log(err))
      setmsg(true)
  }


  return (
    <div>
    <div className='heading'>FSD IMDB clone</div>
    <div className="container mt-5">
        
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Title :</Form.Label>
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

      <Button variant="primary" type="submit" onClick={handlesubmit}>
        Submit
      </Button>
    </Form>
    <div className='mt-5'>
    {msg ? <span className='alert alert-danger'>Succesfully deleted</span>:""}
    </div>

    <div className='m-5 cards'>
    {movieslist.map((data)=>(
      <Card style={{ width: '18rem' }} key={data._id}>
      <Card.Body >
        <Card.Title>Title : {data.title}</Card.Title>
        <Card.Text>Year : {data.year}</Card.Text>
        <Card.Text>Runtime : {data.runtime}</Card.Text>
        <Card.Text>Writer : {data.writer}</Card.Text>
        <Card.Text>Actor : {data.actor}</Card.Text>
        <div>
        <Button variant="primary" onClick={()=>navigate(`/edit/${data._id}`)}>Edit</Button>
        <Button variant="danger" className='ms-3' onClick={()=>handledelete(data._id)}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
    ))}
  </div>
    </div>
    </div>
  )
}

export default Alldatas