const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  //console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newObj = Object.assign({}, state)
      newObj.good += 1
      return newObj
    case 'OK':
      const newObj1 = Object.assign({}, state)
      newObj1.ok += 1
      return newObj1
    case 'BAD':
      const newObj2 = Object.assign({}, state)
      newObj2.bad += 1
      return newObj2
    case 'ZERO':
      const newObj3 = Object.assign({}, initialState)
      return newObj3
    default: return state
  }
  
}

export default counterReducer