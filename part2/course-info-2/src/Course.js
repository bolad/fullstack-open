import React from 'react';

const Course = ({course}) => {
    return (
    <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
    )
}

const Header = ({ name }) => {
  return (
    <h2>{name}</h2>
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
  return(
    <h4>Total of {sum} exercises</h4>
  ) 
}

const Part = ({part}) => {
    const { name, exercises } = part;
  return (
    <p>
      {name} {exercises}
    </p>    
  )
}

const Content = ({ parts }) => {
  return (
    <div>
        {parts.map(part => (
            <Part part={part} />
        ))}   
    </div>
  )
}

export default Course;