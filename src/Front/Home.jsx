import { useState, useEffect, useContext } from "react";
import VisitContext from '../contexts/VisitContext';
import { useNavigate } from "react-router-dom";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [products, setProducts] = useState([]);
  
  const navigate = useNavigate();
  const { hasVisited, markAsVisited } = useContext(VisitContext);

  useEffect(() => {
    if (!hasVisited) {
      
      navigate('/orders');
      markAsVisited(); 
    }
  }, [hasVisited, navigate, markAsVisited]);

  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();

        const generatedProducts = data.products.map((product, index) => ({
          productId: 44146762 + index,
          productStatus: "Available", 
          productDate: "2024-12-26 17:18:39",
          productName: product.title, 
          productDescription: product.description,
          productImage: product.images[0], 
          productPrice: Math.floor(Math.random() * 5000) + 100, 
          rating: product.rating, 
        }));

        setProducts(generatedProducts); 
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (categoryFilter === "All" || product.productStatus === categoryFilter) &&
      (product.productId.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
      
      <div className="ml-16 flex-1 p-6 bg-gray-100 overflow-y-auto">
      
        <div className="flex items-center bg-white p-4 rounded-md shadow-sm mb-6">
          <input
            type="text"
            placeholder="Search by Product ID or Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-500"
          />
        </div>

       
        <div className="flex items-center space-x-8 border-b-2 mb-6">
          {["All", "Available", "OutOfStock"].map((status) => (
            <button
              key={status}
              onClick={() => setCategoryFilter(status)}
              className={`relative pb-2 text-sm font-medium ${
                categoryFilter === status
                  ? "text-gray-800 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-600"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.productId}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col"
            >
         
              <div className="mb-4">
                <img
                  src={product.productImage} 
                  alt={product.productName}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>

             
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {product.productName}
              </h3>

              <p className="text-sm text-gray-600 mb-4">{product.productDescription}</p>

              
              <p className="text-xl font-semibold text-gray-800 mb-2">
                ₹{product.productPrice}
              </p>

             
              <button className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700 mb-2">
                Add to Cart
              </button>

             
              <button className="bg-green-600 text-white py-2 px-4 rounded-md text-sm hover:bg-green-700 mb-2">
                Buy Now
              </button>

              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={index < product.rating ? "gold" : "gray"} 
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path d="M12 17.75l5.6 3.65-1.5-6.9 4.9-4.7-6.8-.6L12 2 9.8 8.6l-6.8.6 4.9 4.7-1.5 6.9z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-4 text-gray-500 text-center">No products found</div>
        )}
      </div>
  );
}

export default Home;
