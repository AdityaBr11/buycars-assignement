import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const SecureRoute = ({children}) => {
    const {crediantial,loading,user} = useSelector((state)=>state.auth)

    if(crediantial===false){
      return <Navigate to={'/login'} />
    }
    return (
      <div>
        {children}
      </div>
  )
}

export default SecureRoute
