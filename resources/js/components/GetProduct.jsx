import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const GetProduct = ({ renderProductCard, renderProductTable, enableCategoryFilter = false }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories , setCategories] = useState([]);


    // Fetch categories
    useEffect(() => {
        if (enableCategoryFilter) {
        fetchCategories();
        }
    }, []);

    const fetchCategories = async () => {
        try {
        const response = await axios.get('/api/admin/getCategories');
        setCategories(response.data);
        } catch (error) {
        console.error('Error fetching categories:', error);
        }
    };

  //get products
  useEffect(() => {
    fetchProducts(currentPage, selectedCategory);
  }, [currentPage, selectedCategory]);

  const fetchProducts = async (page, category_id) => {
    try {
      const response = await axios.get(`/api/admin/getProducts`, {
        params: { category_id: category_id, page: page }
      });
      setProducts(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

    const handleSelectItem = (e)=>{
        setSelectedCategory(e.target.value);
        setCurrentPage(1);
    }
    

  return (
    <div>
        {
            //check if there's selected category
            enableCategoryFilter && ( <select value={selectedCategory} onChange={handleSelectItem} className="form-select form-select-lg mb-3" aria-label="Large select example">
                <option value="all">All</option>
                    {
                        categories.map((item)=>(
                            <option key={item.id} value={item.id}>{item.category_name}</option>
                        ))
                    }
            </select> )
        }

    {renderProductTable ? renderProductTable(products) : renderProductCard(products)}
    
    {/* Pagination */}
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default GetProduct;
