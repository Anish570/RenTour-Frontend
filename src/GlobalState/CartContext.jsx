import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isLoggedIn } = useAuth();

  const [cartItems, setCartItems] = useState(() => {
    const local = localStorage.getItem("cart");
    return local ? JSON.parse(local) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartLoading, setLoading] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Save cart to localStorage when cartItems changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch cart on login
  useEffect(() => {
    if (isLoggedIn) fetchCartItems();
  }, [isLoggedIn]);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/user/get-cart");
      const backendCart = res.data.cart || [];
      setCartItems(backendCart);
      localStorage.setItem("cart", JSON.stringify(backendCart));
    } catch (error) {
      console.error("Cart sync failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productid, offeredPrice) => {
    const existing = cartItems.find((item) => item.productid === productid);
    const updatedItem = existing
      ? {
        productid,
        quantity: existing.quantity + 1,
        offeredPrice: existing.offeredPrice || offeredPrice,
      }
      : { productid, quantity: 1, offeredPrice };

    const updatedCart = existing
      ? cartItems.map((item) =>
        item.productid === productid ? updatedItem : item
      )
      : [...cartItems, updatedItem];

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (isLoggedIn) {
      try {
        await axiosInstance.post("/user/update-cart", {
          cart: [updatedItem],
        });
        toast.success("Item added to cart successfully!");
        await fetchCartItems();
      } catch (err) {
        console.error("Failed to update single cart item:", err);
      }
    }
  };

  const removeFromCart = async (productid) => {
    const updatedCart = cartItems.filter(
      (item) => item.productid !== productid
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (isLoggedIn) {
      try {
        await axiosInstance.post("/user/update-cart", {
          cart: [{ productid, quantity: 0 }],
        });
        toast.error("Item removed from cart successfully!");
        await fetchCartItems();
      } catch (err) {
        console.error("Failed to sync cart after removal:", err);
      }
    }
  };

  const updateQuantity = async (productid, quantity) => {
    if (quantity <= 0) return removeFromCart(productid);

    const updatedCart = cartItems.map((item) =>
      item.productid === productid ? { ...item, quantity } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (isLoggedIn) {
      try {
        await axiosInstance.post("/user/update-cart", {
          cart: [{ productid, quantity }],
        });
        await fetchCartItems();
      } catch (err) {
        console.error("Failed to update quantity:", err);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        toggleCart,
        cartItems,
        cartLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
