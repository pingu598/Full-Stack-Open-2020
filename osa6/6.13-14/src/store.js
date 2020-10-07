import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import anecdoteService from './services/anecdotes'

import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer
})

anecdoteService.getAll().then(anecdotes =>
  store.dispatch(initializeAnecdotes(anecdotes))
)

export const store = createStore(
    reducer,
    composeWithDevTools()
  )
export default store