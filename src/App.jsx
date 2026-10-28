
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { useCart } from "./context/cartState";
import Menu from "./pages/Menu";
import ItemDetails from "./pages/ItemDetails";
import CartPage from "./pages/CartPage";
import "./index.css";

function Header() {
  const { cartCount } = useCart();

  return (
    <header
      style={{
        background: "#166534",
        color: "white",
        padding: "22px",
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none" }}
        >
          <h1>Campus Canteen</h1>
        </Link>

        <Link
          to="/cart"
          style={{ color: "white", textDecoration: "none" }}
        >
          🛒 Cart ({cartCount})
        </Link>
      </nav>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Fresh food, right on campus!
      </p>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
