import { onAuthStateChanged } from "firebase/auth"
import React from "react"
import { auth } from "../firebase"
import { createUser } from "../api"

export const AuthContext = React.createContext({})

const AuthProvider = ({children}) => {

  const [users, setUsers] = React.useState(null) 
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const Listen = onAuthStateChanged(auth, user => {
      if (user){
        setLoading(false)
        setUsers({
          uid: user.uid,
          email:user.email,
          name:user.displayName ,
          photo:user.photoURL
        })
        createUser({
          uid: user.uid,
          email:user.email,
          name:user.displayName ,
          photo:user.photoURL,
        }, user.uid)
      } else {
        setLoading(false)
      }
    })
    return () => Listen()
  }, [])

  const value = React.useMemo(() => ({
    users,
    loading,
  }), [users, loading])


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider