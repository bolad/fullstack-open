import React from 'react'
import ReactDOM from 'react-dom'

const course = 'Half Stack application development'
const part1 = 'Fundamentals of React'
const exercises1 = 10
const part2 = 'Using props to pass data'
const exercises2 = 7
const part3 = 'State of a component'
const exercises3 = 14
const numberOfExercises = exercises1 + exercises2 + exercises3;

const Header = (props) => (
  <div>
    <h1>{props.course}</h1>
  </div>
)

const Part = (props) => {
  return (
    <div>
        <p>{props.part1} {props.exercises1}</p>
        <p>{props.part2} {props.exercises2}</p>
        <p>{props.part3} {props.exercises3}</p>
    </div>
  )
}
const Content = () => (
  <div>
    <Part part1={part1} exercises1={exercises1} />
    <Part part2={part2} exercises2={exercises2} />
    <Part part2={part3} exercises2={exercises3} />
  </div>
)

const Total = (props) => (
  <div>
    <p>Number of Exercises is {props.total}</p>
  </div>
)
const App = () => {
 

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total total={numberOfExercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
