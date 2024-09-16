import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder, clearCart } from "../../app/features/Cart";
import withWrapper from "../HOC/withWrapper";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  const orderStatus = useSelector((state) => state.cart.orderStatus);
  const error = useSelector((state) => state.cart.error);

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phoneNumber: "",
    emailAddress: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [couponCode, setCouponCode] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/user-info");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          throw new Error("Received non-JSON response");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handlePlaceOrder = () => {
    const orderData = {
      userInfo,
      products,
      paymentMethod,
      couponCode,
      saveInfo,
    };

    dispatch(placeOrder(orderData));
  };

  useEffect(() => {
    if (orderStatus === "success") {
      dispatch(clearCart());
      console.log("Order placed successfully");
    }
  }, [orderStatus, dispatch]);

  return (
    <div className="flex flex-col md:flex-row justify-between p-6 space-y-6 md:space-y-0 poppins-medium">
      {/* Billing Details */}
      <div className="md:w-1/2 bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-medium mb-6 text-gray-800">
          Billing Details
        </h2>
        <form className="space-y-4 block text-sm font-medium text-gray-500">
          <div>
            <label htmlFor="firstName">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              value={userInfo.firstName}
              onChange={(e) =>
                setUserInfo({ ...userInfo, firstName: e.target.value })
              }
              className="mt-2 block w-full bg-[#cecccc3a] py-1 focus:ring-red-500 focus:border-red-500 text-gray-700"
              required
            />
          </div>
          {/* Repeat for other fields */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              value={userInfo.companyName}
              onChange={(e) =>
                setUserInfo({ ...userInfo, companyName: e.target.value })
              }
              className="mt-2 block w-full bg-[#cecccc3a] py-1 focus:ring-red-500 focus:border-red-500 text-gray-700"
            />
          </div>
          <div>
            <label
              htmlFor="streetAddress"
              className="block text-sm font-medium"
            >
              Street Address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="streetAddress"
              value={userInfo.streetAddress}
              onChange={(e) =>
                setUserInfo({ ...userInfo, streetAddress: e.target.value })
              }
              className="mt-2 block w-full bg-[#cecccc3a] py-1 focus:ring-red-500 focus:border-red-500 text-gray-700"
              required
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium">
              Town/City<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              value={userInfo.city}
              onChange={(e) =>
                setUserInfo({ ...userInfo, city: e.target.value })
              }
              className="mt-2 block w-full bg-[#cecccc3a] py-1 focus:ring-red-500 focus:border-red-500 text-gray-700"
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={userInfo.phoneNumber}
              onChange={(e) =>
                setUserInfo({ ...userInfo, phoneNumber: e.target.value })
              }
              className="mt-2 block w-full bg-[#cecccc3a] py-1 focus:ring-red-500 focus:border-red-500 text-gray-700"
              required
            />
          </div>
          <div>
            <label htmlFor="emailAddress" className="block text-sm font-medium">
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="emailAddress"
              value={userInfo.emailAddress}
              onChange={(e) =>
                setUserInfo({ ...userInfo, emailAddress: e.target.value })
              }
              className="mt-2 block w-full bg-[#cecccc3a] py-1 focus:ring-red-500 focus:border-red-500 text-gray-700"
              required
            />
          </div>
          <div>
            <label htmlFor="saveInfo" className="inline-flex items-center">
              <input
                type="checkbox"
                id="saveInfo"
                checked={saveInfo}
                onChange={() => setSaveInfo(!saveInfo)}
                className="h-4 w-4 text-red-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-black">
                Save this information for faster check-out next time
              </span>
            </label>
          </div>
        </form>
      </div>

      <div className="md:w-1/2 bg-white p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Order Summary
        </h3>
        {products.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center border-b pb-4 mb-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover"
            />
            <span className="text-sm text-gray-600">{product.name}</span>
            <span className="text-sm text-rise">{product.price}$</span>
          </div>
        ))}
        <div className="border-b py-5">
          <div className="flex justify-between mb-3">
            <span>Subtotal:</span>
            <span className="text-rise">
              {products
                .reduce(
                  (acc, product) => acc + product.price * product.quantity,
                  0
                )
                .toFixed(2)}
              $
            </span>
          </div>
          <div className="flex justify-between mb-3">
            <span>Shipping:</span>
            <span className="text-rise">Free</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span className="text-rise">
              {products
                .reduce(
                  (acc, product) => acc + product.price * product.quantity,
                  0
                )
                .toFixed(2)}
              $
            </span>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
                className="h-4 w-4 text-red-600 border-gray-300"
              />
              <span className="ml-2">Bank</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
                className="h-4 w-4 text-red-600 border-gray-300"
              />
              <span className="ml-2">Cash on delivery</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="px-6 py-2 bg-rose-900 text-white rounded-[4px] shadow-sm hover:bg-rise"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default withWrapper(CheckoutPage);
