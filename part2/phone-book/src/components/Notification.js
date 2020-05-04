import React from 'react';

const Notification = ({ message, hasError = false }) => {
    const notificationClass = hasError ? 'error' : 'notification'
  
    return (
      <div className={notificationClass}>
        {message}
      </div>
    )
  }

  export default Notification;