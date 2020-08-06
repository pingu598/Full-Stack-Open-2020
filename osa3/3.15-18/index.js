const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()    //ennen personia
const Person = require('./models/person')
//const mongoose = require('mongoose') //debuggausta varten

app.use(express.json())
app.use(cors())
app.use(express.static('build'))


let persons = [
    { name: 'Arto Hellas', number: '040-123456', id:1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id:2},
    { name: 'Dan Abramov', number: '12-43-234345', id:3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id:4 }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})


app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

const _date = new Date()

app.get('/api/info', (req, res) => {
  res.send(
  `<div>Phonebook has info for ${persons.length} people</div>
   <div>${_date}</div>
  `
  )
})

const generateId = () => {

  //From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
  }
  return getRandomInt(0,1000000)

}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name===undefined || body.number===undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
 
  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  })
 
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  
})

app.get('/api/persons/:id', (request, response, next) => { 
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(person => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint) //INIT

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)  //INIT

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})