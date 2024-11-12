import React from 'react'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Registration from '../pages/Registration'
import Hilo from '../pages/Hilo'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'




const Navigator = () => {
    const { user } = useAuthContext()
    return (
        <Routes>

            <Route
                path="/"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
                path="/login"
                element={user ? <Navigate to="/dashboard" /> : <Login />} // Render Login if not authenticated
            />
            <Route
                path="/register"
                element={user ? <Navigate to="/dashboard" /> : <Registration />} // Redirect to Dashboard if logged in
            />
            <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
             <Route
                path="/hilo"
                element={user ? <Hilo /> : <Navigate to="/login" />}
            />
        </Routes>


    )
}

export default Navigator