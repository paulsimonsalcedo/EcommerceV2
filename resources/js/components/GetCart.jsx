import axios from "axios";
import React, { useEffect, useState } from "react";

const GetCart = ({TotalCart})=>{
    const [carts, setCarts] = useState([]);
    
    useEffect(()=>{
        getCartList();
    },[]);

    const getCartList = async ()=>{
        try{
            const response = await axios.get('/api/getCartList',{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
                }
            });
            setCarts(response.data);
            console.log(response.data);
        }catch(error){
            console.log(error.response.data);
        }
    }

    return (
        <div>
            {
            carts && carts.length > 0 && Array.isArray(carts[0]) ? (
            carts[0].map((cart)=>(
                <div key={cart.id}>
                    <p> {cart.product.product_name} </p>
                    <p> {cart.product.description} </p>
                    <p> {cart.product.price} </p>
                    <img src={`/storage/products/${cart.product.image}`} alt={cart.product.name} />
                </div>
            ))
        ) 
        : (
            <p>No carts available</p>
        )
            }
        </div>
    );
}

export default GetCart;