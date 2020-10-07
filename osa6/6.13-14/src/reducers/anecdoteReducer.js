const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

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

export const voteAnec = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnec = (content,id) => {
  return {
    type: 'NEW_ANEC',
    data: {
      content,    
      id: id,
      votes: 0
    }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANEC',
    data: anecdotes,
  }
}


export default reducer