import React from 'react';
import Person from './Person';

const Persons = (props) => (
    <div>
          {props.persons.map(person =>
            <li key={person.id}>
                <Person person={person}/>
            </li>    
        )}
    </div>
);

export default Persons