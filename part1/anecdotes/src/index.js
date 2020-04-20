import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const Display = (props) => (
  <h2>{props.heading}</h2>
)

const Anecdote = ({text, numOfvotes}) => {
  return (
    <div>
      <div>{text}</div>
      <div>has {numOfvotes} votes</div>
    </div>
  )
}

const App = ({anecdotes}) => {

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(6) )

  const IncreaseVotes = () => {
    const votesArray = [...votes];
    votesArray[selected] += 1
    setVotes(votesArray);
    //console.log(votesArray);
  }

  const maxVotesNumber = Math.max(...votes);
  const mostVotedAnecdote = votes.indexOf(maxVotesNumber);

  const selectRandom = () => {
    setSelected(Math.floor((Math.random() * anecdotes.length))); 
  }

  return (
    <>
      <div>
        <Display heading="Anecdote of the day" />
        <Anecdote 
          text={anecdotes[selected]} 
          numOfvotes={votes[selected]}
        />
        <Button text="next anectode" handleClick={selectRandom}/>
        <Button text="vote" handleClick={IncreaseVotes}/>
      </div>
      <div>
        <Display heading="Anecdote with most votes" />
        <Anecdote 
          text={anecdotes[mostVotedAnecdote]}
          numOfvotes={votes[mostVotedAnecdote]}
        />
      </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)