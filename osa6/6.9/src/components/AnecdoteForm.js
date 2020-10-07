import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const create = (event) => {
        console.log('create')
        event.preventDefault()
        dispatch(createAnec(event.target.anec.value))
      }

return(
    <div>
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

export default AnecdoteForm