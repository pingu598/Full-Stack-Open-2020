import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { createNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()
    const getId = () => (100000 * Math.random()).toFixed(0)

    const create = async (event) => {
        console.log('create')
        event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ''
        //for server
        dispatch(createAnec(content, getId()))
        //TODO: 
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