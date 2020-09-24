import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import axios from '@/core/axios'

const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
})

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token')
            if (token) {
              axios.defaults.headers.Authorization = `Bearer ${token}`
              const user = {}
              // const { data: user } = await axios.get('users/me')
              if (user) setUser(user)
            }
        }
        loadUserFromCookies()
    }, [])

    const login = async (email, password) => {
        const { data: token } = await axios.post('auth/login', { email, password })
        if (token) {
            Cookies.set('token', token, { expires: 60 })
            axios.defaults.headers.Authorization = `Bearer ${token.token}`
            const { data: user } = await axios.get('users/me')
            setUser(user)
            console.log("Got user", user)
        }
    }

    const logout = (email, password) => {
        Cookies.remove('token')
        setUser(null)
        window.location.pathname = '/login'
    }

    const value = { isAuthenticated: !!user, user, login, logout }

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    )
}

export function ProtectRoute(Component) {
    return (props) => {
        const router = useRouter()
        const { isAuthenticated } = useAuth();

        useEffect(() => {
            if (!isAuthenticated) router.push('/login')
        }, [isAuthenticated])

        return <Component {...props} />
    }
}

export default function useAuth() {
    const context = useContext(AuthContext)

    return context
}