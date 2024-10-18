import React from "react";


const About = ()=>{
    return (
        <div className="about-page">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <img 
                            src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" 
                            alt="About us"
                            className="img-fluid about-image fade-in"
                        />
                    </div>
                    <div className="col-md-6">
                        <h2 className="about-title slide-in">About Our Shop</h2>
                        <p className="about-text slide-in">
                            Welcome to our eCommerce store! We offer a wide range of products that 
                            are handpicked for their quality and design. Our mission is to provide 
                            customers with exceptional service and a delightful shopping experience.
                        </p>
                        <p className="about-text slide-in">
                            From fashion to home decor, our collection features the latest trends at 
                            unbeatable prices. We ensure a smooth shopping process with fast and secure 
                            shipping to your doorsteps.
                        </p>
                        <a href="/shop" className="btn btn-primary about-btn fade-in">
                            Shop Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default About;