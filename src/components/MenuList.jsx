
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

function MenuList() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favourites, setFavourites] = useState([]);

  // Load menu from local JSON file
  useEffect(() => {
    async function loadMenu() {
      try {
        const response = await fetch("/menu.json");

        if (!response.ok) {
          throw new Error("Failed to load menu");
        }

        const data = await response.json();
        setMenu(data);
      } catch {
        setError("Could not load menu. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, []);

  // Add or remove favourite
  function toggleFavourite(id) {
    setFavourites((previous) =>
      previous.includes(id)
        ? previous.filter((itemId) => itemId !== id)
        : [...previous, id]
    );
  }

  // Get unique categories from JSON
  const categories = [
    "All",
    ...new Set(
      menu
        .map((item) => item.category?.trim())
        .filter(Boolean)
    ),
  ];

  // Filter by search and category
  const filteredMenu = menu.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      item.category?.trim() === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <p>Loading menu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="menu-container">
      <h2>Today's Menu</h2>

      <div className="menu-filters">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="menu-list">
        {filteredMenu.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            isFavourite={favourites.includes(item.id)}
            onToggleFavourite={toggleFavourite}
            onViewDetails={(id) => console.log("Selected item:", id)}
          />
        ))}
      </div>

      {filteredMenu.length === 0 && (
        <p>No food items found.</p>
      )}
    </section>
  );
}

export default MenuList;
