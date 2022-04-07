//  //In use for http
// const http = require('http')

const express = require('express')
const app = express()

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get('/', (request, response) => {
    response.send('<h1>Hello All!</h1>')
  })

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/info', (request, response) => {
    response.end(`<h1>Phonebook has info for 4 people</h1> <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    console.log(person)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})
app.use(express.json())

app.post('/api/persons', (request, response) => {
    const body= request.body 
    const person = {
        id: Math.floor(Math.random()*1000),
        name: body.name,
        number: body.number,
    }
    if (!body.name || !body.number) {
        return response.status(400).json({error:`name or number is missing`})
    }  
    if (persons.map(x => x.name).includes(body.name)){
        return response.status(400).json({error:`name must be unique`})
    }
    console.log(persons)
    persons=persons.concat(person)
    response.json(persons)
})

//  //In use for http
// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(phonebook))
//   })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)