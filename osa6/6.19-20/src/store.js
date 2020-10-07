import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
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
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )
export default store