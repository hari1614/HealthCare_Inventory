import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useAddUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  // const { dispatch } = useAuthContext()

  const addUser = async (name, designation, email, password, admin, subAdmin) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, designation, email, password, admin, subAdmin })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      // localStorage.setItem('user', JSON.stringify(json))

      // // update the auth context
      // dispatch({type: 'LOGIN', payload: json})
      

      // update loading state
      setSuccessMsg("New user has been added successfully")
      setIsLoading(false)
    }
  }

  return { addUser, isLoading, error, successMsg }
}