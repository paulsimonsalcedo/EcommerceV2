import React, { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate, useNavigate } from "react-router-dom";


const AdminLogin = ()=>{

    const { adminToken, setAdminToken } = useStateContext();

    if(adminToken)
    {
        return <Navigate to="/admin/dashboard" />
    }


    const [adminEmail, setAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const navigate = useNavigate();

    const handleAdminLogin = async (e)=>{
        e.preventDefault();


        try{
            const response = await axios.post('/api/admin/login', {
                adminEmail,
                adminPassword
            });
      
            if (response.status === 200) {
                toast.success(response.data.message);
                setAdminToken(response.data.token);
                setAdminEmail('');
                setAdminPassword('');
                navigate("/admin/dashboard");
            }
        }catch(error){
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

    const handleAdminEmail = (e)=>{
        setAdminEmail(e.target.value);
    }

    const handleAdminPassword = (e)=>{
        setAdminPassword(e.target.value);
    }


    return (
        <div className="form-container">
            <h2 className="text-center mb-4">Admin</h2>
            <form onSubmit={handleAdminLogin}>
                <div className="form-floating mb-3 position-relative">
                    <input
                        type="email"
                        className="form-control"
                        id="adminEmail"
                        placeholder="name@example.com"
                        onChange={handleAdminEmail}
                    />
                    <label className='me-3' htmlFor="adminEmail">Email address</label>
                   
                </div>
                <div className="form-floating mb-3 position-relative">
                    <input
                        type="password"
                        className="form-control"
                        id="adminPassword"
                        placeholder="Password"
                        onChange={handleAdminPassword}
                    />
                    <label htmlFor="adminPassword">Password</label>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    )
}

export default AdminLogin;