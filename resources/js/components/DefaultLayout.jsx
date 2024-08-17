import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const DefaultLayout = () => {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const navigate = useNavigate();
    const { setToken } = useStateContext();
    
    const handleLogout = async ()=>{
        try{
           const response = await axios.post('/api/logout');
            if(response.data.status === 200)
            {
                setToken(null);
                localStorage.removeItem('ACCESS_TOKEN');
                navigate('/login');
            }

            
        }catch(error){
            toast.error('Logout failed')
        }
    }

    const handleHome = ()=>{
        navigate('/dashboard');
    }
    const handleAbout = ()=>{
        navigate('/about');
    }
    const handleProduct = ()=>{
        navigate('/product');
    }
    const handleContact = ()=>{
        navigate('/contact');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>   
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a onClick={handleHome} className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a onClick={handleAbout} className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a onClick={handleProduct} className="nav-link" href="#">Product</a>
                            </li>
                            <li className="nav-item">
                                <a onClick={handleContact} className="nav-link" href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <form className="d-flex me-5" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-danger" type="submit">Search</button>
                    </form>
                    <div className="nav-user justify-content-end">
                        <i className="fas fa-user">
                            <p className="user-name">User</p>
                        </i>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>
            <Outlet />
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 text-center text-md-left mb-4 mb-md-0">
                            <h5>Follow Us</h5>
                            <div class="social-icons">
                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-twitter"></i></a>
                                <a href="#"><i class="fab fa-instagram"></i></a>
                                <a href="#"><i class="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>

                        <div class="col-md-4 text-center mb-4 mb-md-0">
                            <h5>Subscribe</h5>
                            <form class="subscribe d-flex justify-content-center">
                                <input type="email" placeholder="Your Email" class="form-control" />
                                <button type="submit" class="btn btn-primary">Subscribe</button>
                            </form>
                        </div>
                    </div>

                    <div className="row">
                        <div class="col text-center mt-4">
                            <div class="copyright">
                                &copy; 2024 Paul Shop. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DefaultLayout;