import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnec } from '../reducers/anecdoteReducer'
const AnecdoteForm = (props) => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
    
    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnec(id))
      }

return(
    <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
            </div>
        ).sort(function(a, b) {
            return b.props.children[1].props.children[1] - a.props.children[1].props.children[1]
        })}
    </div>
   )
}

export default AnecdoteForm