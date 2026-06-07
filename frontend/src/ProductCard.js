function ProductCard({ id, name, price, onDelete }) {
  return (
    <div className="card">
      <h2>{name}</h2>

      <p>Price: ₹{price}</p>

      <button
        className="delete-btn"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </div>
  );
}

export default ProductCard;