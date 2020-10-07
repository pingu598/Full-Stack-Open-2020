const notificationReducer = (state = 'TEST', action) => {
    switch (action.type) {
      case 'NOTIF':
        return state
      default:
        return state
    }
  }
export default notificationReducer