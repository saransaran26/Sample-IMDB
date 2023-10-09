const express = require('express')
const Movies = require('../models')

const routes = express.Router()

routes.post('/movies',async(req,res)=>{
    const data = new Movies({
        title:req.body.title,
        year:req.body.year,
        runtime:req.body.runtime,
        writer:req.body.writer,
        actor:req.body.actor
    })
    try {
        const savedmovies = await data.save()
        res.status(201).json(savedmovies)
    } catch (error) {
        res.status(400).json({error})
    }
})

routes.get('/movies',async(req,res)=>{
    try {
        const data = await Movies.find()
    res.send(data)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    
})

routes.get('/movie/:id',async(req,res)=>{
    try {
        const data = await Movies.findById(req.params.id)
    res.send(data)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
    
})

routes.put('/movie/:id',async(req,res)=>{
    try {
        const data = await Movies.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.send(data)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
    
})

routes.delete('/movie/:id',async(req,res)=>{
    try {
        const data = await Movies.findByIdAndDelete(req.params.id)
    res.json({message:"item deleted successfully"})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
    
})

module.exports = routes