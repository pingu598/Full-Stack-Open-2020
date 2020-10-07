import React from 'react'
import { connect } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { createNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const getId = () => (100000 * Math.random()).toFixed(0)

    const create = async (event) => {
        console.log('create')
        event.preventDefault()
        const content = event.target.anec.value
        event.target.anec.value = ''
        //for server
        props.createAnec(content, getId())
        props.createNotification(`new anecdote '${content}'`)
        setTimeout(() => {
          
        }, 5000)
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

export default connect(
  null,
  {createAnec, createNotification}
  )(AnecdoteForm)