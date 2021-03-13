import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email:'', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST', {...form})
            message(data.message)

        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)

        } catch (e) {}
    }


    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Скороти посилання</h1>
                <div className="card #e040fb purple accent-2">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизація</span>
                        <div>
                            <div className="input-field ">
                                <input 
                                placeholder="Введіть електронну адресу" 
                                id="email" 
                                type="text"
                                name="email"
                                className="yellow-input"
                                value={form.email} 
                                onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field ">
                                <input 
                                placeholder="Введіть пароль" 
                                id="password" 
                                type="password" 
                                name="password"
                                className="yellow-input"
                                value={form.password} 
                                onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                       <button 
                       className="btn #4a148c purple darken-4" 
                       style={{ marginRight: 10}}
                       disabled={loading}
                           onClick={loginHandler}>
                           Увійти</button>
                       <button 
                       className="btn #aa00ff purple accent-4 black-text"
                       onClick={registerHandler}
                       disabled={loading}>
                           Реєстрація</button>
                    </div>
                </div>

            </div>
            
        </div>
    )
} 