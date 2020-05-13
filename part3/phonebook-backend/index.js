const express = require('express');
const app = express();
require('dotenv').config();
const Contact = require('./models/person');
const cors = require('cors');
var morgan = require('morgan');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
app.use(
    morgan(
      ':method :url :status :res[content-length] - :response-time ms :reqbody'
    )
  );

  morgan.token('reqbody', function(request) {
    return JSON.stringify(request.body);
  });

app.get('/', (request, response) => {
    response.send('<h1>Hello Stanley!</h1>')
  })

app.get('/api/persons', (request, response) => {
    Contact.find({}).then(persons => {
        response.json(persons.map(person => person.toJSON()))
    })
})

app.get('/info', (request, response, next) => {
    Contact.countDocuments({}).then(personsCount => {
        response.send(
            `<div>Phonebook has info for ${personsCount} people</div>
            <br>
            <div>${new Date()}</div>`
        )
    })
    .catch(error => next(error));
})

app.get('/api/persons/:id', (request, response) => {
    Contact.findById(request.params.id).then(person => {
       if (person) {
           response.json(person.toJSON());
       } else {
           response.status(400).end();
       }
    })
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'missing parameters'
        })
    }

    const person = new Contact({
       name: body.name,
       number: body.number
    });

    person.save().then(savedPerson => {
        response.json(savedPerson.toJSON());
    })
    .catch(error => next(error));
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'missing parameters'
        })
    }

    const person = {
        name: body.name,
        number: body.number
     };

    Contact.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON());
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response) => {
    Contact.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name == 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({error: 'malformatted id'})
    } else {
        return next(error)
    }
}

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


