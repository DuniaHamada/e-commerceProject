import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../app/features/Cart";
import withWrapper from "../HOC/withWrapper";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import ConfirmModal from "./ConfirmModal ";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.cart.products);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const calculateTotalPrice = () => {
    return products
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      dispatch(removeFromCart({ id: productToDelete.id }));
    }
    setShowModal(false);
  };

  return (
    <div className="min-h-screen py-10 poppins-medium">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="bg-white rounded-lg p-6 w-full lg:w-3/4">
            <table className="min-w-full">
              <thead>
                <tr className="shadow-md p-10">
                  <th className="px-10 py-4 text-left font-bold text-rise">
                    Product
                  </th>
                  <th className="p-5 text-right font-bold text-rise">Price</th>
                  <th className="py-4 px-28 text-right font-bold text-rise">
                    Quantity
                  </th>
                  <th className="p-4 text-right font-bold text-rise">
                    Subtotal
                  </th>
                  <th className="p-4 text-right font-bold text-rise"></th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      Your cart is empty.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="shadow-md p-10">
                      <td className="py-4 px-4 flex items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg mr-4"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <span>{product.price} $</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() =>
                              dispatch(decreaseQuantity({ id: product.id }))
                            }
                            className="p-2 border rounded hover:bg-gray-200"
                          >
                            <FaMinus />
                          </button>
                          <span className="px-4 py-2 text-center">
                            {product.quantity !== undefined &&
                            product.quantity !== null
                              ? product.quantity.toString().padStart(2, "0")
                              : "00"}
                          </span>
                          <button
                            onClick={() =>
                              dispatch(increaseQuantity({ id: product.id }))
                            }
                            className="p-2 border rounded hover:bg-gray-200"
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span>
                          {(product.price * product.quantity).toFixed(2)} $
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button onClick={() => handleDeleteClick(product)}>
                          <FaTimes className="text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-lg p-6 mt-8 lg:mt-0 lg:ml-8 lg:w-1/4">
            <h3 className="text-xl font-semibold mb-4">Cart Total</h3>
            <div className="space-y-6 text-gray-800">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-gray-600">{calculateTotalPrice()}$</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-gray-600">Free</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-2">
                <span>Total:</span>
                <span className="text-gray-600">{calculateTotalPrice()}$</span>
              </div>
              <button
                className="w-full mt-4 bg-rose-800 text-white px-4 py-3 rounded-lg shadow hover:bg-rise transition"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

const WrapperNavbar = withWrapper(Cart);
export default WrapperNavbar;
