import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    if (!name || !price) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        {
          name,
          price
        }
      );

      setName("");
      setPrice("");

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Product List</h1>

      <div className="form-container">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <button
          className="add-btn"
          onClick={addProduct}
        >
          Add Product
        </button>
      </div>

      <div className="cards">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            onDelete={deleteProduct}
          />
        ))}
      </div>
    </div>
  );
}

export default App;