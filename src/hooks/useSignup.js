import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import toast from 'react-hot-toast'; 

export const useSignup = () => {
     const [error, setError] = useState(null)
     const [isLoading, setIsLoading] = useState(null)
     //const { dispatch } = useAuthContext()
     const signup = async (username, password, email) => {
          setIsLoading(true)
          setError(null)

          const response = await fetch('http://localhost:4000/api/user/signup', {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify({ username, password, email})
          })
          const json = await response.json()

          if(!response.ok){
               setIsLoading(false)
               setError(json.error)
               toast.error(json.error);
          }
          else{
               //saving to local storage
               //localStorage.setItem('user', JSON.stringify(json))


               //update AuthContext
               //dispatch({type: 'LOGIN', payload: json})

               setIsLoading(false)
               toast.success("Registration succesful");
          }
     }
     return { signup, isLoading, error }
}