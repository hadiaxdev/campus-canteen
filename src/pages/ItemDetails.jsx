
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartState";

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadItem() {
      try {
        const response = await fetch("/menu.json");

        if (!response.ok) {
          throw new Error("Menu could not be loaded");
        }

        const data = await response.json();
        const selectedItem = data.find(
          (food) => food.id === Number(id)
        );

        setItem(selectedItem || null);
      } catch {
        setError("Unable to load item details.");
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  if (loading) return <p>Loading item...</p>;
  if (error) return <p>{error}</p>;
  if (!item) return <p>Item not found.</p>;

  return (
    <section className="menu-container">
      <button onClick={() => navigate("/")}>
        ← Back to Menu
      </button>

      <div className="item-card" style={{ maxWidth: "500px", marginTop: "20px" }}>
        <img src={item.image} alt={item.name} />

        <div className="item-info">
          <p>{item.category}</p>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <h3>Rs. {item.price}</h3>

          <button
            className="details-button"
            onClick={() => {
              addToCart(item);
              navigate("/cart");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ItemDetails;
