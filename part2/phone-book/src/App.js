import React, { useState, useEffect } from 'react';
import { FilterBox } from './components/FilterBox';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [filteredPerson, setFilteredPerson] = useState('')

    useEffect(() => {
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          setPersons(response.data)
      })
    }, [] );

    const addPerson = event => {
        event.preventDefault()
        const personObj = {
          name: newName,
          number: newNumber,
          id: persons.length + 1
        }
        persons.includes(newName) ? alert(`${newName} already exists in phonebook`) :
        setPersons( persons.concat(personObj))
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = event => {       
        setNewName(event.target.value)  
    }

    const handleNumberChange = event => {       
        setNewNumber(event.target.value)  
    }

    const handleFilteredPerson = event => {
        setFilteredPerson(event.target.value)
    }

    const filteredPersons = persons.filter(person => 
        person.name.toLowerCase().includes(filteredPerson.toLowerCase())
    )

    return (
      <div>
        <h2>Phonebook</h2>
        Filter shown with <FilterBox handleChange={handleFilteredPerson} />
        <PersonForm 
            newName={newName}
            newNumber={newNumber}
            addPerson={addPerson}
            handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange}
        />
        <h2>Numbers</h2>
        <Persons persons={filteredPersons}/>
      </div>
    )
  }
  
  export default App