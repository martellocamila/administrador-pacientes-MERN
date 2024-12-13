import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axios'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [ auth, setAuth ] = useState({})
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const authenticateUser = async () => {
        const token = localStorage.getItem('token')
        if(!token) {
            setLoading(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axiosClient('/vets/profile', config)
            setAuth(data)
        } catch (error) {
            console.log(error.response.data.msg)
            setAuth({})
        }

        setLoading(false)
      }
      authenticateUser()
    }, [])
    
    const logOut = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const updateProfile = async info => {
        const token = localStorage.getItem('token')
        if(!token) {
            setLoading(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/vets/profile/${info._id}`
            const { data } = await axiosClient.put(url, info, config)
            return {
                msg: 'Almacenado Correctamente'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const savePassword = async (info) => {
        const token = localStorage.getItem('token')
        if(!token) {
            setLoading(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = 'vets/update-password'
            const { data } = await axiosClient.put(url, info, config)
            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                logOut,
                updateProfile,
                savePassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext