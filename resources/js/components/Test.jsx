import React, { useState } from 'react';


const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [flyingImage, setFlyingImage] = useState(null);

  const products = [
    { id: 1, name: 'Product 1', price: '$10', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: '$20', image: 'https://via.placeholder.com/150' },
  ];

  const addToCart = (product) => {
    setCartCount(cartCount + 1);

    // Start the flying image animation
    setFlyingImage({
      image: product.image,
      start: true,
    });

    // Remove the flying image after animation
    setTimeout(() => setFlyingImage(null), 1000);
  };

  return (
    <div className="App">
      <div className="cart-counter">
        🛒 Cart: {cartCount}
      </div>

      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {flyingImage && (
        <div className={`flying-image ${flyingImage.start ? 'fly' : ''}`}>
          <img src={flyingImage.image} alt="Flying product" />
        </div>
      )}
    </div>
  );
}

export default App;
