// import { useState } from 'react'
// import { useAuthContext } from './useAuthContext'

// export const useLogin = () => {
//   const [error, setError] = useState(null)
//   const [isLoading, setIsLoading] = useState(null)
//   const { dispatch } = useAuthContext()

//   const login = async ( email, password) => {
//     setIsLoading(true)
//     setError(null)

//     const response = await fetch('/api/user/login', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({ email, password })
//     })
//     const json = await response.json()

//     if (!response.ok) {
//       setIsLoading(false)
//       setError(json.error)
//     }
//     if (response.ok) {
//       // save the user to local storage
//       localStorage.setItem('user', JSON.stringify(json.user))

//       // update the auth context
//       dispatch({type: 'LOGIN', payload: json.user})

//       // update loading state
//       setIsLoading(false)
//     }
//   }

//   return { login, isLoading, error }
// }


import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || 'Something went wrong');
      }

      // Save the user to local storage including admin field
      localStorage.setItem('user', JSON.stringify(json.user));

      // Update the auth context
      dispatch({ type: 'LOGIN', payload: json.user });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
