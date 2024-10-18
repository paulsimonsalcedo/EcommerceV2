import axios from "axios";
import React, { useEffect, useState } from "react";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { toast } from "react-toastify";
import GetProduct from "../components/GetProduct";

const ProductList = ()=>{   
   
    const [deleteID, setDeleteID] = useState(null);
    const [showModal, setShowModal] = useState(false);



    // delete Product
    const handleShowModal = (e) => {
        setDeleteID(e.target.value);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleDelete = async ()=>{

        try{
            const response = await axios.post('/api/admin/deleteProduct',{
                deleteID:deleteID
            });
            toast.success(response.data.message);
            handleCloseModal();

        }catch(error){
            console.error("There was an error deleting the product:", error);
        }


    }

    const renderProductTable = (products)=>{
        return(
        <table className="table table-primary">
            <thead>
                <tr className="text-center">
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr className="text-center" key={product.id}>
                        <td>{product.product_name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.category.category_name}</td>
                        <td>
                            <img src={`/storage/products/${product.image}`} alt={product.name} width="50" />
                        </td>
                        <td>
                            <button 
                                value={product.id} 
                                className="btn btn-primary mx-2">
                                Edit
                            </button>
                            <button 
                                onClick={handleShowModal} 
                                value={product.id} 
                                className="btn btn-danger">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))} 
            </tbody>
        </table>
        );
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <div className="product-list">
                        <GetProduct renderProductTable={renderProductTable} enableCategoryFilter={true} />
                    </div>
                </div>
            </div>
            <ConfirmDeleteModal
                show={showModal}
                handleClose={handleCloseModal}
                handleConfirm={handleDelete}
                message="Are you sure you want to delete this product?"
            />
        </div>

    )
}

export default ProductList;