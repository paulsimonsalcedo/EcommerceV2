import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductList = ()=>{   
   
    //FETCH PRODUCTS 
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [categories , setCategories] = useState([]);

    const handleSelectItem = (e)=>{
        setSelectedCategory(e.target.value);
    }

    //getCategories
    useEffect(()=>{
        axios.get('/api/admin/getCategories').then((result)=>{
            setCategories(result.data);
        }).catch((error) => {
            console.error('Error fetching categories:', error);
          });
    },[]);

    //getProducts
    // useEffect(() => {
    //     fetchProducts(currentPage);
    // }, [currentPage]);

    // const fetchProducts = async (page) => {
    //     try {
    //         const response = await axios.get(`/api/admin/getProducts?page=${page}`);
    //         setProducts(response.data.data);
    //         setTotalPages(response.data.last_page);
    //     } catch (error) {
    //         console.error("Failed to fetch products", error);
    //     }
    // };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <div className="category">
                        <select value={selectedCategory} onChange={handleSelectItem} className="form-select form-select-lg mb-3" aria-label="Large select example">
                            <option value="" selected>All</option>
                           {
                                categories.map((item)=>(
                                    <option key={item.id} value={item.id}>{item.category_name}</option>
                                ))
                           }
                        </select>
                    </div>
                    <div className="product-list">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category.name}</td>
                                        <td>
                                            <img src={`/storage/products/${product.image}`} alt={product.name} width="50" />
                                        </td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList;