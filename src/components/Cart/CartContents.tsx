import { FC } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { CartData, removeFromCart, updateCart } from "../../redux/cart";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

interface CartItems {
  cart: CartData[];
  userId: string;
  guestId: string;
}

interface HandleCartProps {
  productId: string;
  delta?: number;
  quantity?: number;
  size: string;
  color: string;
}

const CartContets: FC<CartItems> = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch<AppDispatch>();

  // handle adding or substracing to cart
  const handleAddToCart = ({
    productId,
    delta,
    quantity,
    size,
    color,
  }: HandleCartProps) => {
    const newQuantity = (quantity as number) + (delta as number);
    if (newQuantity >= 1) {
      dispatch(
        updateCart({
          productId,
          quantity: newQuantity,
          size,
          color,
          guestId,
          userId,
        })
      );
    }
  };

  const handleRemoveFromCart = ({
    productId,
    size,
    color,
  }: HandleCartProps) => {
    dispatch(removeFromCart({ productId, size, color, guestId, userId }));
  };

  const currentCart = Array.isArray(cart) ? cart[0] : cart;

  return (
    <div>
      {currentCart?.products?.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between p-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddToCart({
                      productId: product.productId,
                      delta: -1,
                      quantity: product.quantity,
                      size: product.size,
                      color: product.color,
                    })
                  }
                  className="cursor-pointer rounded px-2 py-1 text-xl font-medium"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart({
                      productId: product.productId,
                      delta: 1,
                      quantity: product.quantity,
                      size: product.size,
                      color: product.color,
                    })
                  }
                  className="cursor-pointer rounded px-2 py-1 text-xl font-medium"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p className="font-medium">$ {product.price}</p>
            <button
              onClick={() =>
                handleRemoveFromCart({
                  productId: product.productId,
                  size: product.size,
                  color: product.color,
                })
              }
              className="cursor-pointer"
            >
              <RiDeleteBin3Line className="h-6 w-6 text-red-600 mt-2" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContets;
