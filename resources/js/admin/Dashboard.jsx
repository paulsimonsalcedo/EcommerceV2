import React, { useState } from "react";

const Dashboard = ()=>{
    const [graph, setGraph] = useState({});

    
    return (
        <div className="container">
            <div className="row">
                <h4>Overview</h4>
                <div className="col-md-4 col-lg-4 col-sm-6">
                    <div className="card-overview">
                        <i style={{color: '#f57138'}} className="fas fa-shopping-bag"></i>
                        <p>Total Orders</p>
                        <span>$50</span>
                    </div>
                </div>
                <div className="col-md-4 col-lg-4 col-sm-6">
                    <div className="card-overview">
                        <i style={{color: '#25a5db'}} className="fas fa-hourglass-start"></i>
                        <p>Pending Orders</p>
                        <span>$50</span>
                    </div>
                </div>
                <div className="col-md-4 col-lg-4 col-sm-6">
                    <div className="card-overview">
                        <i style={{color: '#2c1f4d'}} className="fas fa-tshirt"></i>
                        <p>Total Product</p>
                        <span>$50</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 col-lg-12">

                </div>
            </div>
        </div>
    )
}

export default Dashboard