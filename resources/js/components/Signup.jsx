import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleUsername = (e)=>{
        setUsername(e.target.value);
    }
    const handleEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value);
    }
    const handleConfirmPassword = (e)=>{
        setConfirmpassword(e.target.value);
    }

    const handleSignup= async (e)=>{
        e.preventDefault();
        setErrors({}); // Clear previous errors

        try{
            //link     data     response
            const response = await axios.post('/api/signup', {
                username,
                email,
                password,
                password_confirmation: confirmpassword
            });

            toast.success(response.data.message); // Show success message
            // Clear form fields
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmpassword('');

            navigate('/');

        }catch(error) {
            if(error.response && error.response.data.errors) {
                const errors = error.response.data.errors;
                Object.keys(errors).forEach((key) => {
                    errors[key].forEach((errorMsg) => {
                        toast.error(errorMsg);
                    });
                });
            } else{
                toast.error('An unexpected error occurred.');
            }
        }
    }

    return (
        <div className="form-container">
        <h2 className="text-center mb-4">Signup</h2>
        <form onSubmit={handleSignup}>
            <div className="form-floating mb-3 position-relative">
                <input 
                type="text" 
                className="form-control" 
                id="signupUsername" 
                placeholder="Username"
                value={username} 
                onChange={handleUsername} />
                <label htmlFor="signupUsername">Username</label>
            </div>
            <div className="form-floating mb-3 position-relative">
                <input 
                type="email" 
                className="form-control" 
                id="signupEmail" 
                placeholder="name@example.com"
                onChange={handleEmail} />
                <label htmlFor="signupEmail">Email address</label>
            </div>
            <div className="form-floating mb-3 position-relative">
                <input 
                type="password" 
                className="form-control" 
                id="signupPassword" 
                placeholder="Password"
                onChange={handlePassword} />
                <label htmlFor="signupPassword">Password</label>
            </div>
            <div className="form-floating mb-3 position-relative">
                <input 
                type="password" 
                className="form-control" 
                id="signupConfirmPassword" 
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={handleConfirmPassword} />
                <label htmlFor="signupConfirmPassword">Confirm Password</label>
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">Signup</button>
            </div>

            <div className="text-center mt-3">
                <p>
                    Already have an account? <Link to="/">Login</Link>
                </p>
            </div>
        </form>
    </div>
    )
}

export default Signup;