import { useEffect, useState } from "react";
import Product from "../Product/CartProduct";
import Navbar from "../Components/Navbar";

const CART_KEY = "cartproducts";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(CART_KEY));
    if (Array.isArray(stored)) {
      setCartItems(stored);
    }
  }, []);

  // Remove single item
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_KEY);
  };

  return (
    <div className="max-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto mt-[28vh] px-4">
        {/* Cart Box */}
        <div className="bg-white rounded-xl shadow-md border">
          {/* Header */}
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h1 className="text-xl font-semibold">Shopping Cart</h1>

            <div className="flex items-center gap-4">
              <span className="text-gray-500">{cartItems.length} Items</span>

              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:underline"
                >
                  Clear Cart
                </button>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Your cart is empty 🛒</p>
              </div>
            ) : (
              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-4
                  xl:grid-cols-5
                  gap-6
                "
              >
                {cartItems.map((product) => (
                  <div key={product._id} className="relative group">
                    <Product product={product} isCart={true} />

                    {/* Remove Button */}
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(product._id)}
                      className="
    absolute -top-2 -right-2
    w-6 h-6
    bg-red-500 text-white
    rounded-full
    flex items-center justify-center
    text-sm font-bold
    shadow-md
    hover:bg-red-600
    transition
  "
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
