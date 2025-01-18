import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import GetProduct from "../components/GetProduct";
import { CartContext } from "../contexts/CartContext";

const Product = ()=>{

    const style = {color:"#343a40"};
    const { settoggleFetch } = useContext(CartContext);
    
    const handleAddToCart = async (e)=>{
        
        const product_id = e.target.value;
        
        try{
            const response = await axios.post('/api/addtoCart',
                {
                    product_id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
                    }
                }
            );

            toast.success(response.data.message);
            settoggleFetch(prev => !prev);
            console.log(response.data.message);
            
        }catch(error){
            toast.error("Cannot add to cart",error);
        }

    }

    const renderProductCard = (products)=>{
        return (
            <div className="row">
                {
                    products.map(product =>(
                        <div key={product.id} className="col-md-3 col-lg-3 col-sm- col-xs-6">
                            <div className="product-card">
                                <div className="card" key={product.id}>
                                    <div className="hidden-button">
                                        <button 
                                            value={product.id}
                                            onClick={handleAddToCart} 
                                            className="add-to-cart btn btn-outline-danger">Add To Cart</button>
                                        <button 
                                            value={product.id}
                                            className="buy btn btn-danger">Buy</button>
                                    </div>
                                    <img src={`/storage/products/${product.image}`} alt={product.name} />
                                    <div className="description">
                                        <p>{product.price}</p>
                                        <p>{product.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <div className="container">
            <h1 className="mb-4" style={style}>Products</h1>
            <GetProduct renderProductCard={renderProductCard} enableCategoryFilter={true} />
        </div>
    )
}


export default Product;