
import { useState } from "react";
import { CartContext } from "./cartState";

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart((previous) => {
      const existing = previous.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existing) {
        return previous.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...previous, { ...item, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((previous) =>
      previous.filter((item) => item.id !== id)
    );
  }

  function updateQuantity(id, quantity) {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCart((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

