const initialState = {
    content: 'Test'
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LIKE':
        const newObj = Object.assign({}, state)
        newObj.content = `you liked '${action.data}'`
        return newObj
      case 'ADD':
        const newObj1 = Object.assign({}, state)
        newObj1.content = `you added '${action.data}'`
        return newObj1
      default:
        return state
    }
  }

  export const voteNotification = (name) => {
    return {
      type: 'LIKE',
      data: name 
    }
  }
  export const createNotification = (name) => {
    return {
      type: 'ADD',
      data: name 
    }
  }
export default notificationReducer