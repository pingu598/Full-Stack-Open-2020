import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecToChange = state.find(n => n.id === id)
      const changedAnec = { 
        ...anecToChange, 
        votes: anecToChange.votes + 1
      }
      return state.map(anec =>
        anec.id !== id ? anec : changedAnec
      )
    case 'NEW_ANEC':    
      return [...state, action.data]
    default: return state
    case 'INIT_ANEC':
      return action.data
  }

}

export const voteAnec = (content, id, votes) => {
  return async dispatch => {
    await anecdoteService.voteAnec(content, id, votes)
    dispatch({
      type: 'VOTE',
      data: {    
        id: id
      }
    })
  }
}

export const createAnec = (content,id) => {
  return async dispatch => {
    await anecdoteService.createNew(content, id)
    dispatch({
      type: 'NEW_ANEC',
      data: {
        content,    
        id: id,
        votes: 0
      }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANEC',
      data: anecdotes,
    })
  }
}


export default reducer