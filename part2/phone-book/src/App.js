import React, { useState, useEffect } from 'react';
import { FilterBox } from './components/FilterBox';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import Notification from './components/Notification';

import contactService from './services/contacts';

import './index.css';

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [filteredPerson, setFilteredPerson] = useState('')
    const [notification, setNotification] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
      contactService
        .getAll()
        .then(initialContacts => {
          // console.log(initialContacts)
          setPersons(initialContacts)
        })
    }, [])

    const addPerson = event => {
      event.preventDefault()

      const personObj = {
        name: newName,
        number: newNumber,
      }

      const exitingContacts = persons.map(person => person.name)

      if (exitingContacts.includes(newName)) {
        const contactToUpdate = persons.find(person => person.name === newName)

        if (window.confirm(`${newName} already exists in phonebook. Do you want to update the phonenumber?`)) {
          contactService
            .update(contactToUpdate.id, personObj)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
              setNewName('')
              setNewNumber('')
              setNotification('Phone number updated successfully')
            }).catch(error => {
              setErrorMessage(`Information of '${newName}' has already been removed from server`)
            })
            handleNotifications();
        }
      } else {
        contactService
        .create(personObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification('Contact successfully added to phonebook')
        })
        handleNotifications();
      }
    }

    const removePerson = contact => {
      if (window.confirm("Are you sure you want to delete this contact?")) {
        contactService
          .remove(contact.id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== contact.id))
            setNotification(`'${contact.name}' has been deleted from the phone book`)
          })
          .catch(() => {
            setErrorMessage(`Information of '${contact.name}' has already been removed from server`) 
          })
          handleNotifications();
      }
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

    const handleNotifications = () => {
      setTimeout(() => {
        setNotification('')
        setErrorMessage('')
      }, 5000)
    }

    const filteredPersons = persons.filter(person => 
        person.name.toLowerCase().includes(filteredPerson.toLowerCase())
    )

    return (
      <div>
        <h2>Phonebook</h2>
        {
          notification ? (
            <Notification message={notification} /> 
          ) : null 
        }
        {
          errorMessage ? (
            <Notification message={errorMessage} hasError={true} />
          ) : null
        }

        <FilterBox handleChange={handleFilteredPerson} />
        <PersonForm 
            newName={newName}
            newNumber={newNumber}
            addPerson={addPerson}
            handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange}
        />
        <h2>Numbers</h2>
        {filteredPersons.map(person => 
          <li key={person.id}>
            <Person 
              person={person}
              removePerson={removePerson}
            />
          </li>   
        )}
      </div>
    )
  }
  
  export default App