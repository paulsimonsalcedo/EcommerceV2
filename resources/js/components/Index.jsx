
import React from "react";


function Index(){

    return(
        <>
            <div className="banner">
                <div className="container banner-inner">
                    <div className="banner-content">
                        <h1>
                        Welcome to Paul Shop
                        </h1>
                        <p>
                        Discover a wide range of products at unbeatable prices! From the latest electronics and fashion trends to home essentials and beauty products, we have everything to cater to your needs.
                        </p>
                        <button>Get Started</button>
                    </div>
                    <div className="banner-cart">
                        <img src="/images/cart-icon-14.png" />
                    </div> 
                </div>
            </div>

            <div className="section-2">
                <div className="container">
                    <h1>
                        Why Choose Us?
                    </h1>
                    <div className="row">
                        <div className="col-md-4 col-lg-4 col-sm-6 col-xs-6 row-inner">
                            <div className="card">
                                <div className="why-icon">
                                    <i className="fas fa-hand-holding-usd"></i>
                                </div>
                                <div className="why-title">
                                    <h3>Competitive Prices</h3>
                                </div>
                                <div className="why-description">
                                    <p>We offer unbeatable prices on all our products, ensuring you get the best value for your money. Enjoy regular discounts and special offers to save even more.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-6 col-xs-6 row-inner">
                            <div className="card">
                                <div className="why-icon">
                                    <i className="fas fa-shield-alt"></i>
                                </div>
                                <div className="why-title">
                                    <h3>Secure Shopping Experience</h3>
                                </div>
                                <div className="why-description">
                                    <p>Shop with peace of mind knowing that your personal and payment information is protected with the highest security standards.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-6 col-xs-6 row-inner">
                            <div className="card">
                                <div className="why-icon">
                                    <i className="fas fa-shipping-fast"></i>
                                </div>
                                <div className="why-title">
                                    <h3>Fast and Reliable Shipping</h3>
                                </div>
                                <div className="why-description">
                                    <p>We understand the importance of timely deliveries. Our efficient logistics ensure that your orders reach you quickly and in perfect condition.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-6 col-xs-6 row-inner">
                            <div className="card">
                                <div className="why-icon">
                                    <i className="fas fa-exchange-alt"></i>
                                </div>
                                <div className="why-title">
                                    <h3>Easy Returns and Exchanges</h3>
                                </div>
                                <div className="why-description">
                                    <p>We offer a hassle-free return and exchange policy. If you’re not completely satisfied with your purchase, we make it easy to return or exchange your items.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-6 col-xs-6 row-inner">
                            <div className="card">
                                <div className="why-icon">
                                    <i className="fas fa-user-friends"></i>
                                </div>
                                <div className="why-title">
                                    <h3>User-Friendly Interface</h3>
                                </div>
                                <div className="why-description">
                                    <p>Our website is designed to provide a seamless shopping experience. Find what you need quickly and easily with our intuitive navigation and search features.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-6 col-xs-6 row-inner">
                            <div className="card">
                                <div className="why-icon">
                                    <i className="fas fa-smile"></i>
                                </div>
                                <div className="why-title">
                                    <h3>Customer Reviews and Ratings</h3>
                                </div>
                                <div className="why-description">
                                    <p>Make informed purchasing decisions with the help of genuine customer reviews and ratings. See what others have to say about the products before you buy.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}
export default Index;