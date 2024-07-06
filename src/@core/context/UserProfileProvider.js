import React from 'react'
import { useSession } from './JWTSessionProvider'
// USERS DATA SERVICES
import Users from 'src/@services/Users'
import Jobs from 'src/@services/Jobs'

const { GetRequests: UserGetRequests } = Users
const { GetRequests: JobGetRequests } = Jobs

const UserSessionContext = React.createContext(null)

export default function UserSessionProvider({ children }) {
  const [userSession, setUserSession] = React.useState({});
  const session = useSession()
  console.log('session provider', session)
  const GetAllCategories = () => {
    const data = UserGetRequests.GetAllCategories()
    return data
  }
  const GetAllStates = () => {
    const data = UserGetRequests.GetAllStates()
    return data
  }
  const GetListJobByUsers = async () => {
    if (session.user_id) {
      const { user_id = '' } = session
      const { jobPosts = [] } = await JobGetRequests.GetUserJobPosts(user_id)
      return jobPosts
    }
  }
  React.useEffect(async () => {
    const userCategories = await GetAllCategories()
    const allStates = await GetAllStates()
    const jobPosts = await GetListJobByUsers()
    setUserSession({
      userJobPost: jobPosts,
      userCategories,
      allStates
    })
  }, [session.user_id])
  return <UserSessionContext.Provider value={userSession}>{children}</UserSessionContext.Provider>
}

export const useSessionUser = () => React.useContext(UserSessionContext)
