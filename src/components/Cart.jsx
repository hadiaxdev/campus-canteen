
import { useCart } from "../context/cartState";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <section>
      <h2>Your Cart</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "12px",
            padding: "15px",
            marginBottom: "12px",
            background: "white",
            borderRadius: "10px",
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: "75px",
              height: "65px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />

          <div style={{ flex: 1 }}>
            <strong>{item.name}</strong>
            <p>Rs. {item.price} each</p>
          </div>

          <button
            onClick={() =>
              updateQuantity(item.id, item.quantity - 1)
            }
          >
            −
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() =>
              updateQuantity(item.id, item.quantity + 1)
            }
          >
            +
          </button>

          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: Rs. {cartTotal}</h3>
    </section>
  );
}

export default Cart;
