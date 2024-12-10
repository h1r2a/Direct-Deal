import React, { useRef, useState} from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import userService from '../../services/userService'

import Spinner from '../Common/Spinner/Spinner'
const Login = () => {

    const spinnerRef = useRef(null);
    const initialState = { userName: "", password: "" }
    const [formData, setFormData] = useState(initialState)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    const navigate = useNavigate();
    
    const login = async (e) => {
        e.preventDefault();
        spinnerRef.current.show();
        try {
            await userService.login(navigate, formData);
            spinnerRef.current.hide(); // Cache le spinner après un succès
        } catch (error) {
            console.error("Login error:", error);
            spinnerRef.current.hide(); // Cache le spinner en cas d’erreur
        }
    };
    




    return (
        <div className='login-ct'>
            <Spinner ref={spinnerRef} />
            <div className="header">
                <h1>D-Deal</h1>
            </div>
            <div className="form">
                <h2 className='greeting'>Welcome Back! </h2>
                <div className="form-ct">
                    <form onSubmit={login}> 
                        <div className="f-group">
                            <label htmlFor="username">Username : </label>
                            <input type="text" name='userName' value={formData.userName} onChange={handleChange} />
                        </div>
                        <div className="f-group">
                            <label htmlFor="password">Password : </label>
                            <input type="password" name='password' value={formData.password} onChange={handleChange} />
                        </div>
                        <div className="bt-ct">
                            <button>
                                Login
                            </button>
                        </div>
                        <Link to={'/'} about='forgot password ?'/>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login
