import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import ConnectedAnecdotes from './components/AnecdoteList'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <ConnectedAnecdotes/>
      <AnecdoteForm/>
      <Notification/>
    </div>
  )
}

export default App