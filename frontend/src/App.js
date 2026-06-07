import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
   <div className="container">
  <h1>Product List</h1>

  <div className="cards">
    {products.map((product) => (
      <ProductCard
        key={product._id}
        name={product.name}
        price={product.price}
      />
    ))}
  </div>
</div>
  );
}

export default App;