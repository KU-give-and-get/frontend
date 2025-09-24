import React, { useEffect, useState } from "react";
import axios from "axios";
import WishItem from "../components/WishItem";

interface WishItemType {
  _id: number;
  name: string;
  category: string; 
  quantity: number;
  description: string;
  status: string;
}

const categories = ["Clothing", "Study Materials", "Activity Equipment"];

const WishList = () => {
  const [wishlist, setWishlist] = useState<WishItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get<WishItemType[]>(
          "http://localhost:4000/api/wishitems",
          {
            headers: { Authorization: token ? `Bearer ${token}` : "" },
          }
        );
        // Filter out items with undefined category
        setWishlist(res.data.filter((item) => !!item.category));
      } catch (err: any) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [token]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredWishlist =
    selectedCategories.length > 0
      ? wishlist.filter(
          (item) =>
            item.category &&
            selectedCategories.includes(item.category)
        )
      : wishlist;

  if (loading) return <p>Loading wish items...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col sm:flex-row border-t pt-10 gap-10">
      {/* Filter */}
      <div className="flex-shrink-0">
        <label
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 text-xl cursor-pointer"
        >
          FILTERS
          <img
            className={`h-4 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src="/images/dropdown_icon.png"
            alt=""
          />
        </label>

        <div
          className={`border-gray-300 border pl-5 py-3 mt-6 pr-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="py-2">CATEGORIES</p>
          <div className="flex flex-col gap-2 font-light text-gray-700">
            {categories.map((category) => (
              <label key={category} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="flex-1">
        <p className="text-3xl text-gray-500 font-light">
          All <span className="text-gray-700 font-medium">WISH ITEMS</span>
        </p>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {filteredWishlist.map((item) => (
            <WishItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              quantity={item.quantity}
              status={item.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishList;
