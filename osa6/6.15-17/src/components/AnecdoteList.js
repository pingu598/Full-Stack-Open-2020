import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnec } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'
const AnecdoteForm = (props) => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    
    const vote = (id, content, votes) => {
        console.log('vote', id)
        dispatch(voteAnec(content, id, votes))
        dispatch(voteNotification(content))
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
                <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
            </div>
            </div>
        ).sort(function(a, b) {
            return b.props.children[1].props.children[1] - a.props.children[1].props.children[1]
        })}
    </div>
   )
}

export default AnecdoteForm