import React from "react";


const Contact = ()=>{

    const style = {color: "#343a40"};

    return (
       <div className="container m-4">
           
            <div className="row contact-row">
            <h1 className="mb-4" style={style}>Contact Us</h1>
                <div className="col-md-6 col-lg-6 col-sm-12">
                    <div className="left-contact">
                        <h2><b>How can we help?</b></h2>
                        <p>Contact Us!</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-sm-12">
                    <div className="contact-form">
                            <form action="#" method="post">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" placeholder="Your name" required />

                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="Your email" required/>

                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" placeholder="Your message" required></textarea>

                                <button type="submit">Submit</button>
                            </form>
           
                    </div>
                </div>
            </div>
       </div>
    )
}


export default Contact;