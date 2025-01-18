import axios from "axios";
import React, { useEffect, useState } from "react";

const GetCart = ()=>{
    
    const [carts, setCarts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    
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

    const handleAddToCartCheck = (event)=>{
        console.log(event.target.value);
    }

    return (
        <div className="container">
            <table className="table cart-table">
                <thead>
                    <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                    </tr>      
                </thead>
                {
                carts.length > 0 && Array.isArray(carts[0]) ? 
                (
                    carts[0].map((cart)=>(
                        <tbody key={cart.id}>
                            <tr>
                                <td scope="row">
                                    <div className="d-flex cart-flex">
                                        <i style={{fontSize:"30px", margin:"15px"}} className="fas fa-times"></i>
                                        <input 
                                            value={cart.product.id} 
                                            style={{transform: "scale(1.5)", marginRight: "20px"}}
                                            onChange={handleAddToCartCheck}
                                            type="checkbox"/>
                                        <img src={`/storage/products/${cart.product.image}`} alt={cart.product.name} />
                                        <p>{cart.product.product_name}</p>
                                    </div>
                                </td>
                                <td scope="row">
                                    <input type="number" id="quantity" name="quantity" value="1" min="1" required/>
                                </td>
                                <td scope="row">
                                    <input type="number" id="quantity" name="quantity" value="1" min="1" required/>
                                </td>
                            </tr>
                        </tbody>
                    ))
                )
                :
                (
                    <tbody>
                        <tr>
                            <td colSpan="3" style={{ textAlign: "center" }}>
                                No Carts Available
                            </td>
                        </tr>
                    </tbody>
                )
                }
            </table>
        </div>
    );
}

export default GetCart;