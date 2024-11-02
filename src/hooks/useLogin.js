import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import toast from 'react-hot-toast'; 


export const useLogin = () => {
     const [error, setError] = useState(null)
     const [isLoading, setIsLoading] = useState(null)
     const { dispatch } = useAuthContext()


     const login = async (username, password) => {
          setIsLoading(true)
          setError(null)

          const response = await fetch('http://localhost:4000/api/user/login', {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify({ username, password })
          })
          const json = await response.json()

          if(!response.ok){
               setIsLoading(false)
               setError(json.error)
               toast.error(json.error);
          }
          else{
               //saving to local storage
               localStorage.setItem('user', JSON.stringify(json))


               //update AuthContext
               dispatch({type: 'LOGIN', payload: json})

               setIsLoading(false)
               toast.success('Login successful')
          }
     }
     return { login, isLoading, error }
}