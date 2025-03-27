import { FC } from "react";
import { IoMdClose } from "react-icons/io";
import CartContets from "../Cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type CartDrawerProps = {
  drawerOpen?: boolean;
  toggleCartDrawer?: () => void;
};

const CartDrawer: FC<CartDrawerProps> = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state: RootState) => state.auth);
  const { cart } = useSelector((state: RootState) => state.cart);
  const userId = user ? user._id : null;


  const handleCheckout = () => {
    toggleCartDrawer?.();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ease-in-out ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer} className="cursor-pointer">
          <IoMdClose className="h-6 w-6 text-gray-600 " />
        </button>
      </div>
      {/* Cart Content */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 ">Your Cart</h2>
        {/* Component for Cart Contents */}
        {cart?.products?.length ? (
          <CartContets
            cart={cart}
            userId={userId ?? ""}
            guestId={guestId ?? ""}
          />
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      {/* Checkout  Button */}
      <div className="p-4 bg-white sticky bottom-0">
        {cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleCheckout}
              className="cursor-pointer w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              Checkout
            </button>
            <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
              Shipping, taxes, and discounts calculated at checkout
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
