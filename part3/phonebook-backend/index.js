const express = require('express');
const app = express();
var morgan = require('morgan');
app.use(express.json());
const cors = require('cors');

app.use(cors());

//app.use(morgan('tiny'));

app.use(
    morgan(
      ':method :url :status :res[content-length] - :response-time ms :reqbody'
    )
  );

  morgan.token('reqbody', function(request) {
    return JSON.stringify(request.body);
  });

let persons = [
    { 
        name: 'Arto Hellas', 
        number: '040-123456',
        id: 1
    },
    { 
        name: 'Ada Lovelace', 
        number: '39-44-5323523',
        id: 2
    },
    { 
        name: 'Dan Abramov', 
        number: '12-43-234345',
        id: 3
    },
    { 
        name: 'Mary Poppendieck', 
        number: '39-23-6423122',
        id: 4
    }
]

const generateId = (min, max) => {
   return Math.floor(Math.random() * (max - min)) + min;
}

app.get('/', (request, response) => {
    response.send('<h1>Hello Stanley!</h1>')
  })

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(
        `<div>Phonebook has info for ${persons.length} people</div>
        <br>
        <div>${new Date()}</div>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)

    if(person) {
        response.json(person)
    } else {
        response.status(400).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons.filter(person=> person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        response.status(400).json({
            error: 'missing parameters'
        })
    }

    const existingContacts = persons.map(person => person.name)

    if (existingContacts.includes(body.name)) {
        response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(5, 100)
    }

    persons = persons.concat(person)

    response.json(person)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


