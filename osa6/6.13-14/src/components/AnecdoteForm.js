import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { createNotification} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'
const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    const getId = () => (100000 * Math.random()).toFixed(0)

    const create = async (event) => {
        console.log('create')
        event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ''
        const newAnec = await anecdoteService.createNew(content, getId())
        dispatch(createAnec(newAnec.content, newAnec.id)) 
        dispatch(createNotification(content))
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