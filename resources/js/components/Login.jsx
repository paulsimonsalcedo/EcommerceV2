// Login.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useStateContext } from '../contexts/ContextProvider';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const navigate = useNavigate();
    const {setUser , setToken} = useStateContext();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/signin', {
                email,
                password
            });

            if (response.status === 200) {
                const {token, user} = response.data;
                setToken(token)
                setEmail("");
                setPassword("");
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response && error.response.data.errors) {
                const errors = error.response.data.errors;
                Object.keys(errors).forEach((key) => {
                    errors[key].forEach((errorMsg) => {
                        toast.error(errorMsg);
                    });
                });
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    }

    return (
        <div className="form-container">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-floating mb-3 position-relative">
                    <input
                        type="email"
                        className="form-control"
                        id="loginEmail"
                        placeholder="name@example.com"
                        onChange={handleEmail}
                    />
                    <label className='me-3' htmlFor="loginEmail">Email address</label>
                   
                </div>
                <div className="form-floating mb-3 position-relative">
                    <input
                        type="password"
                        className="form-control"
                        id="loginPassword"
                        placeholder="Password"
                        onChange={handlePassword}
                    />
                    <label htmlFor="loginPassword">Password</label>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
                <div className="text-center mt-3">
                    <a href="#" className="btn btn-link">Forgot password?</a>
                </div>
                <div className="text-center mt-3">
                    <p>
                        Don't have an account? <Link to="/signup">Signup</Link>
                    </p>
                </div>
            </form>
        </div>
        
    );
}

export default Login;
