
import { useNavigate } from "react-router-dom";

function ItemCard({ item, isFavourite, onToggleFavourite }) {
  const navigate = useNavigate();

  return (
    <div className="item-card">
      <img src={item.image} alt={item.name} />

      <div className="item-info">
        <p className="item-category">{item.category}</p>
        <h3>{item.name}</h3>
        <p>{item.description}</p>

        <div className="item-bottom">
          <strong>Rs. {item.price}</strong>

          <button onClick={() => onToggleFavourite(item.id)}>
            {isFavourite ? "♥" : "♡"}
          </button>
        </div>

        <button
          className="details-button"
          onClick={() => navigate(`/item/${item.id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
