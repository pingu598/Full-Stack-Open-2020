import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnec, createAnec } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnec(id))
  }

  const create = (event) => {
    console.log('create')
    event.preventDefault()
    dispatch(createAnec(event.target.anec.value))
  }

  return (
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
      )}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anec" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App