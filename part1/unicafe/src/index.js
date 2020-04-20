import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = props => <div><h2>{props.value}</h2></div>

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Statistic = (props) => (
  <div>{props.text} {props.value}</div>
)

const Statistics = (props) => {
    if (props.all == 0) {
      return <p>No feedback yet</p>
    }
    return (
      <div>
        <table>
          <tr>
            <td><Statistic text="good" /></td>
            <td><Statistic value={props.good} /></td>
          </tr>
          <tr>
            <td><Statistic text="neutral" /></td>
            <td><Statistic value={props.neutral} /></td>
          </tr>
          <tr>
            <td><Statistic text="bad" /></td>
            <td><Statistic value={props.bad} /></td>
          </tr>
          <tr>
            <td><Statistic text="average" /></td>
            <td><Statistic value={props.average} /></td>
          </tr>
          <tr>
            <td><Statistic text="positive" /></td>
            <td><Statistic value={props.positive} /></td>
          </tr>
        </table> 
      </div>
    );
  
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad

  const average = (good + (bad * -1) + (neutral * 0))/all

  const positive = (good/(all) * 100) + " %"

  const increaseGood = () => (
    setGood(good + 1)
  )

  const increaseNeutral = () => (
    setNeutral(neutral + 1)
  )

  const increaseBad = () => (
    setBad(bad + 1)
  )

  return (
    <div>
        <Display value="Please give feedback" />
        <Button text="good" handleClick={increaseGood} />
        {" "}
        <Button text="neutral" handleClick={increaseNeutral} />
        {" "}
        <Button text="bad" handleClick={increaseBad} />
        {" "}
        <Display value="Statistics" />

        <Statistics 
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          average={average}
          positive={positive}
        />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)