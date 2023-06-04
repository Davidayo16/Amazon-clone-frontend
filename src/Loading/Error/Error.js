import React from 'react'

const Message = ({variant, children}) => {
  return (
    <div className='alert-container mb-3'>
      <div className={`alert ${variant} mb-0 w-100`}>{children}</div>
    </div>
  )
}

Message.defaultProps={
  variant:"alert-info"
}


export default Message