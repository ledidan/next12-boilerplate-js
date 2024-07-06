import React from 'react'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import { useRouter } from 'next/router'
const SessionContext = React.createContext(null)

export default function JWTSessionProvider({ children }) {
  const [decodedSession, setDecodedSession] = React.useState({})
  const router = useRouter()
  React.useEffect(() => {
    // ** Check if ov_token cookies exists
    const sessionToken = Cookies.get('ov_token')
    if (!sessionToken) {
      setDecodedSession({})
    }
    try {
      const decodedToken = jwt.verify(sessionToken, `${process.env.JWT_CLIENT_SECRET_KEY}`)
      setDecodedSession(decodedToken)
      console.log('decodedToken', decodedToken)
      // return decodedToken ? router.push(`/`) : router.push('/login')
      return decodedToken
    } catch (err) {
      // ** Token might be not valid or expired !
      if (err.message === 'jwt expired' || err.message === 'jwt must be provided') {
        console.log('jwt info', err.message)
        Cookies.remove('ov_token')
        return router.push('/login')
      } else {
        console.error('Token verification failed:', err.message)
      }
    }
  }, [])
  return <SessionContext.Provider value={decodedSession}>{children}</SessionContext.Provider>
}

export const useSession = () => React.useContext(SessionContext)
