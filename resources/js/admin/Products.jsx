import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


const Products = ()=>{

    const [ProductName, setProductName] = useState('');
    const [Description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [price , setPrice] = useState('');
    const [category , setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [isCategoryAdded , setIsCategoryAdded] = useState(false);

    function catchError(error){
        if (error.response && error.response.data.errors) {
            const errors = error.response.data.errors;
            Object.keys(errors).forEach((key) => {
                errors[key].forEach((errorMsg) => {
                    toast.error(errorMsg);
                });
            });
        } else {
            toast.error('An unexpected error occurred.');
        }
    }

    const handleCategory = (e) =>{
        setCategory(e.target.value);
    }

    const saveCategory = async (e)=>{
        e.preventDefault();

        try{
            const response = await axios.post('/api/admin/saveCategory', {category});

            if(response.status === 200){
                const message = response.data.message;
                toast.success(message);
                setCategory('');
                setIsCategoryAdded(prev => !prev);
            }
            
        }catch(error){
            catchError(error);
        }
        
    }

    const handleSelectChange = (event) => {
        setSelectedItem(event.target.value);
    };

    //get all category
    useEffect(()=>{
        axios.get('/api/admin/getCategories').then((response)=>{
            setCategories(response.data);
        }).catch((error) => {
            console.error('Error fetching categories:', error);
          });
    },[isCategoryAdded]);

    //image
    const handleImage = (e)=>{
        const file = e.target.files[0]; //current file
        if(file){ //check if there's a file
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setPreviewImage(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    const saveProduct = async  (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('selectedItem', selectedItem);
        formData.append('ProductName', ProductName);
        formData.append('Description', Description);
        formData.append('image', image);
        formData.append('price', price);
    
        try {
            const response = await axios.post('/api/admin/saveProduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success(response.data.message);
            setProductName('');
            setDescription('');
            setImage(null);
            setPreviewImage(null);
            setSelectedItem('');
            setPrice('');
        } catch (error) {
            catchError(error);
        }
    }


    return (
        <div className="container">
            <h4>Add Product</h4>
            <div className="row">
                <div className="col-md-7 col-lg-7">
                    <div className="general-information mt-4 p-4 shadow rounded">
                        <h5>General Information</h5>
                        <div className="form-floating mb-3">
                            <input 
                                onChange={(e)=> setProductName(e.target.value)}
                                value={ProductName} 
                                type="text" className="form-control" 
                                id="floatingProductName" 
                                placeholder="Product Name"
                            />
                            <label htmlFor="floatingProductName">Product Name</label>
                        </div>
                        <div className="form-floating">
                            <input 
                                onChange={(e)=> setDescription(e.target.value)} 
                                value={Description}
                                type="text" 
                                className="form-control" 
                                id="floatingDescription" 
                                placeholder="Description"/>

                            <label htmlFor="floatingDescription">Description</label>
                        </div>
                    </div>
                </div>

                <div className="col-md-5 col-lg-5">
                    <div className="product-media mt-4 p-4 shadow rounded">
                        <h5>Product Media</h5>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Upload</span>
                            </div>
                            <div className="custom-file">
                                <input
                                    onChange={handleImage} 
                                    type="file" 
                                    className="custom-file-input" 
                                    id="inputGroupFile01"
                                    />
                                    
                                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                            </div>
                            {
                               previewImage && (
                                <div className="mt-3">
                                    <img 
                                        src={previewImage} 
                                        alt="Selected" 
                                        style={{maxWidth: '100px', maxHeight: '100px'}}
                                    />
                                </div>
                               )
                            }
                        </div>
                    </div>
                </div>

                <div className="col-md-7 col-lg-7">
                    <div className="add-category mt-4 p-4 shadow rounded">
                        <h5>Add Category</h5>
                        <div className="form-floating mb-3">
                            <input 
                                value={category} 
                                onChange={handleCategory} 
                                type="text" 
                                className="form-control" 
                                id="floatingAddCategory" 
                                placeholder="Add Category"
                                />
                            <label htmlFor="floatingAddCategory">Add Category Name</label>
                        </div>
                        <button onClick={saveCategory} type="button" className="btn btn-primary">Save Category</button>
                    </div>
                </div>

                <div className="col-md-5 col-lg-5">
                    <div className="select-category mt-4 p-4 shadow rounded">
                        <h5>Product Categories</h5>
                        <div className="form-group">
                        <select value={selectedItem} onChange={handleSelectChange} className="form-select">
                            <option value="">Select Categories</option>
                             {categories.map((item)=>(
                                <option value={item.id} key={item.id}> {item.category_name} </option>
                             ))}
                        </select>
                    </div>
                    </div>
                </div>

                <div className="col-md-7 col-lg-7">
                    <div className="pricing mt-4 p-4 shadow rounded">
                        <h5>Pricing</h5>
                        <div className="form-floating mb-3">
                            <input
                                onChange={(e)=> setPrice(e.target.value)}
                                value={price} 
                                type="text" 
                                className="form-control" 
                                id="floatingPricing" 
                                placeholder="Price" 
                                />
                            <label htmlFor="floatingPricing"> Price </label>
                        </div>
                    </div>
                </div>

            </div>

            <button onClick={saveProduct} type="button" className="btn btn-success mt-4"> Save Product </button>
        </div>
    )
}

export default Products