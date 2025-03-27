import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { createCheckoutSession } from "../../redux/checkout";
import axios from "axios";
import { toast } from "sonner";

type Product = {
  image: string;
  name: string;
  size: string;
  color: string;
  price: number;
};

interface PaymentDetails {
  paymentDetails: {
    transactionId: string;
    paymentGateway: string;
    amount: number;
    currency: string;
  };
}

interface FormCheckout {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
}

const Checkout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { cart, loading, error } = useSelector(
    (state: RootState) => state.cart
  );
  const { user } = useSelector((state: RootState) => state.auth);

  const [checkoutId, setCheckoutId] = useState< string | null>(null);
  const [shippingAddress, setShippingAddress] = useState<FormCheckout>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phone: "",
    country: "",
    postalCode: "",
  });

  // Ensure cart is loaded before proceeding
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckoutSession({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "PayPal",
          totalPrice: cart.totalPrice,
        })
      )
      console.log("Res Payload Id :", res.payload._id)

      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id); // Set Checkout ID if checkout was succesful
      }
    }
  };

  const handlePaymentSuccess = async (details: PaymentDetails) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      await handleFinalizeCheckout(checkoutId); // Finalize checkout if payment succesful
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId: string | null) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,{},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading cart ...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0)
    return <p>Cart is empty</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user?.email}
              className="w-full p-2 text-gray-500 border rounded cursor-not-allowed"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={shippingAddress.firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setShippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={shippingAddress.lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setShippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={shippingAddress.address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                value={shippingAddress.city}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setShippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-gray-700">
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                value={shippingAddress.postalCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setShippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700">
              Country
            </label>
            <input
              type="text"
              id="country"
              value={shippingAddress.country}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={shippingAddress.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setShippingAddress({
                  ...shippingAddress,
                  phone: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {/* BUTTON CHECKOUT */}
          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue to payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with Paypal</h3>
                <PayPalButton
                  amount={cart.totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={() => toast.error("Payment failed, Try again.")}
                />
              </div>
              // Paypal Component
            )}
          </div>
        </form>
      </div>
      {/* Right Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4 border-gray-300">
          {cart.products.map((product: Product, index: number) => (
            <div
              className="flex items-start justify-between py-2 border-b border-gray-300"
              key={index}
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4"
                />
                <div className="">
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p className="">Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
