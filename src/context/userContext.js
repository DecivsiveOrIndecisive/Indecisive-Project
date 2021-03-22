import { createContext, useEffect, useState } from 'react'
import { useHistory, useLocation, withRouter } from 'react-router'
import axios from 'axios'


export const UserContext = createContext()
export const UserProvider = withRouter(props => {
    const [user, setUser] = useState(null)
    const history = useHistory()
    const {path} = useLocation()

    useEffect(() => {
        if(!user && path !== '/login') { 
            
        }
    }, [user, path])

    useEffect(() => {
        if(user && path === '/') {
            history.push('/')
        }
    }, [user, path])

    const register = async (name, email, password) => {
        try {
            const response = await axios.post('', { name, email, password})
            setUser(response.data)
            history.push('/')
            console.log('Successfully created account')
        }
        catch (err){
            if (err.response.status === 500) {
                console.log('Invalid email')
            } else if(err.response.status === 400){
                console.log('Email already in use')
            } else if(err.response.status === 502){
                console.log('Please enter a name')
            }
        }
    }
    const login = async(email, password) => {
        try {
            const response = await axios.post('', { email, password })
            setUser(response.data)
            history.push('/')
        }
        catch {
            console.log('Incorrect login information')
        }
    }
    const logout = async () => {
        await axios.post('')
        setUser(null)
        history.push('/')
    }
    return (
        <UserContext.Provider value={{user, setUser, register, login, logout}}>
            {props.children}
        </UserContext.Provider>
    )
})