import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = ()=>{
    
    const { adminToken } = useStateContext();

    if(!adminToken)
    {
        return <Navigate to="/admin/login" />
    }

    const navigate = useNavigate();

    const {setAdminToken} = useStateContext();

    const handleAdminLogout = async (e)=>{
        e.preventDefault();

        try{
            const AdminLogout = await axios.post('/api/admin/logout');

            if(AdminLogout.data.status === 200)
            {
                setAdminToken(null);
                localStorage.removeItem('ADMIN_ACCESS_TOKEN');
                navigate('/admin/login');
            }
    
        }catch (error) {
            toast.error('An error occurred while logging out.');
        }

    }
    
    const [title , setTitle] = useState('Dashboard');

    const handleNavigation = (title)=>{
      setTitle(title);
      // navigate(path);
    }

    return(
        <div className="row">
            <div className="side-bar bg-dark col-md-2 col-lg-2 col-sm-2 col-xs-2 min-vh-100">
              <div className="top-sidebar">
                <p className="fs-4 navbar-brand d-none d-lg-inline">Paul - Shop</p>
              </div>
              <ul className="nav nav-pills flex-column">
                <div className="line d-none d-lg-inline"></div>
                <li className="nav-item text-white fs-4">
                    <Link 
                      to="/admin/dashboard" 
                      onClick={() => handleNavigation("Dashboard")} 
                      className={`nav-link text-white ${title === 'Dashboard' ? 'active' : ''}`}
                    >
                      <i className="fas fa-box"></i>
                      <span className="ms-3 d-none d-lg-inline">Dashboard</span>
                    </Link>
                </li>
                <li className="nav-item text-white fs-4">
                    <Link 
                      to="/admin/dashboard/users" 
                      onClick={() => handleNavigation("Users")} 
                      className={`nav-link text-white ${title === 'Users' ? 'active' : ''}`}
                    >
                      <i className="fas fa-users"></i>
                      <span className="ms-3 d-none d-lg-inline">Users</span>
                    </Link>
                </li>
                <li className="nav-item text-white fs-4">
                    <Link 
                      to="/admin/dashboard/orders" 
                      onClick={() => handleNavigation("Orders")} 
                      className={`nav-link text-white ${title === 'Orders' ? 'active' : ''}`}
                    >
                      <i className="fas fa-cart-plus"></i>
                      <span className="ms-3 d-none d-lg-inline">Orders</span>
                    </Link>
                </li>
                <li className="nav-item text-white fs-4">
                  <Link 
                      to="/admin/dashboard/products" 
                      onClick={() => handleNavigation("Products")} 
                      className={`nav-link text-white ${title === 'Products' ? 'active' : ''}`}
                  >
                      <i className="fas fa-tshirt"></i>
                      <span className="ms-3 d-none d-lg-inline">Products</span>
                    </Link>
                </li>
                <li className="nav-item text-white fs-4">
                  <Link 
                      to="/admin/dashboard/ProductList" 
                      onClick={() => handleNavigation("ProductsList")} 
                      className={`nav-link text-white ${title === 'ProductsList' ? 'active' : ''}`}
                  >
                      <i className="fas fa-tshirt"></i>
                      <span className="ms-3 d-none d-lg-inline">Product List</span>
                    </Link>
                </li>
                <li className="nav-item text-white fs-4">
                    <Link 
                      to="/admin/dashboard/settings" 
                      onClick={() => handleNavigation("Settings")} 
                      className={`nav-link text-white ${title === 'Settings' ? 'active' : ''}`}
                    >
                      <i className="fas fa-tools"></i>
                      <span className="ms-3 d-none d-lg-inline">Settings</span>
                    </Link>
                </li>
                <div className="line"></div>
                <li className="nav-item fs-4 my-1">
                  <a onClick={handleAdminLogout} id="logout" className="nav-link text-white">
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="ms-3 d-none d-lg-inline">Logout</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10 min-vh-100">
                <div className="container">
                  <div className="row main d-flex align-items-center">
                    <div className="col-md-3 col-lg-3 mt-2">
                        <div className="title">
                          <h2>{title}</h2>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6 mt-2">
                        <div className="input-group">
                            <span className="input-group-text" id="search-icon">
                                <i className="fas fa-search"></i>
                            </span>
                            <input 
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            />
                        </div>
                    </div>
                    <div className="col-md-3 col-lg-3 mt-2 icons">
                        <i className="fas fa-bell"></i>
                        <i className="fas fa-user-circle"></i>
                    </div>
                  </div>
                  <hr></hr>
                  {/* DYNAMIC CONTENT*/}
                  <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;