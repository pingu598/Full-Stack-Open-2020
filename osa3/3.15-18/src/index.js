const express = require('express')
const app = express()
const cors = require('cors')
var morgan = require('morgan')

app.use(express.json())
app.use(morgan('tiny'))
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
  res.json(persons)
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
  console.log(body)

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }
  const getName = persons.find(p => p.name === person.name)
  console.log("Included", persons.includes(getName))
  
  if(persons.includes(getName)) {
    response.status(406).end()
  } else {
    persons = persons.concat(person)
    response.json(person)
    
  }
  
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = persons.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})