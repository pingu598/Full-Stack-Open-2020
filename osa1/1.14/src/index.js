import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)
const RandomNum = () => {

    return (
        Math.floor(Math.random() * 5)     
    )
}

const points = [ 0,0,0,0,0,0 ]
const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVote] = useState(0)
    

    const SetAnec = () => {       
        setSelected(RandomNum())  
        setVote(points[selected])
    }
    const AddVote = () => {        
        setVote(points[selected] + 1)
        points[selected] += 1
    }

    console.log(Math.max(...points))
    return (
        <div>     
            <h1>Anecdote of the day</h1>
            {props.anecdotes[selected]}
            <p>has {points[selected]} votes </p>
            <Button onClick={AddVote} text='vote' />  
            <Button onClick={SetAnec} text='next anecdote' />  
            <h1>Anecdote with most votes</h1>
            <p> {anecdotes[points.indexOf(Math.max(...points))]} </p>  
        </div>
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