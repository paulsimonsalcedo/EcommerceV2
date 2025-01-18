import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) =>{
    const [toggleFetch, settoggleFetch] = useState(false);

    return(
        <CartContext.Provider value={{toggleFetch, settoggleFetch}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;