import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.content)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const hide = {
    display: 'none'
  }
 

  if (notification==='Test'){
    return (
      <div style={hide}>
        {notification}
      </div>
    )
  } else { 
    return (
        <div style={style}>
          {notification}
        </div>
      ) 
  }
}

export default Notification