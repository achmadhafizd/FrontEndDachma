// Helper function to load cart from local storage
export const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { products: [] };
};

// Helper function to save cart to local storage
export const saveCartToStorage = <T>(cart: T) =>
  localStorage.setItem("cart", JSON.stringify(cart));

