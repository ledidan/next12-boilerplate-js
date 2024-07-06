import React from 'react'
import { useRouter,  } from 'next/router'

import { useSession } from '../../context/JWTSessionProvider'
const ProtectedRoute = ({ children }) => {
  const router = useRouter()
  const session = useSession()

  React.useEffect(() => {
    if (!session) {
      router.push('/login')
    } 
  }, [session])

  return <>{children}</>
}

export default ProtectedRoute
