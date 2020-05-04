import React from 'react';



const Person = ({person, removePerson}) => (
    <div className="contact">
        {person.name} {person.number} {' '}
        <button onClick={() => removePerson(person)}>Delete</button>
    </div>
)

export default Person;