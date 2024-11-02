import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
     const { dispatch } = useAuthContext();
     const logout = () => {
          //1-delete user from local storage
          localStorage.removeItem('user')

          //2-dispatch
          dispatch({type: 'LOGOUT'})
     }
     return {logout}
}