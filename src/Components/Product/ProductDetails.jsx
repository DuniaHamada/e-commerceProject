import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { toast, ToastContainer } from "react-toastify";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../app/features/Cart";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.products);

  const handleAddToCart = () => {
    const productExists = cartItems.find((item) => item.id === id);

    if (productExists) {
      toast(
        <div className="flex items-center">
          <ExclamationCircleIcon className="w-7 h-7 text-[#82817f] mr-3" />
          <div>{`${product.title} is already in your cart!`}</div>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "text-sm bg-white shadow-lg rounded-lg",
          bodyClassName: "text-[#82817f]",
        }
      );
    } else {
      dispatch(
        addToCart({
          id,
          image: product?.images[0],
          name: product?.title,
          price: product?.price,
          color: selectedColor,
          size: selectedSize,
        })
      );
      toast(
        <div className="flex items-center">
          <CheckCircleIcon className="w-7 h-7 text-[#82817f] mr-3" />
          <div>{`${product.title} added to cart successfully!`}</div>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "text-sm bg-white shadow-lg rounded-lg",
          bodyClassName: "text-[#82817f]",
        }
      );
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(response.data);
        setSelectedColor(response.data.colors ? response.data.colors[0] : "");
        setSelectedSize(response.data.sizes ? response.data.sizes[0] : "");
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <FaStar key={index} className="text-yellow-500" />
          ))}
        {halfStar === 1 && <FaStarHalfAlt className="text-yellow-500" />}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <FaRegStar key={index} className="text-yellow-500" />
          ))}
      </>
    );
  };

  const renderReviews = (reviews) => {
    return reviews.map((review, index) => (
      <div key={index} className="mt-4 border-b pb-4">
        <div className="flex items-center">
          {renderRatingStars(review.rating)}
          <p className="ml-2 text-sm text-gray-500">
            by {review.reviewerName} on{" "}
            {new Date(review.date).toLocaleDateString()}
          </p>
        </div>
        <p className="mt-2">{review.comment}</p>
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div className="p-6 poppins-medium">
      <ToastContainer />
      <h2 className="px-48 font-semibold">Product Details:</h2>
      <div className="flex flex-col items-center">
        <div className="relative group">
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            className="w-full max-w-lg"
          >
            {product.images && product.images.length > 0 ? (
              product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`${product.title} image ${index + 1}`}
                    className="w-full object-contain shadow-lg p-10"
                  />
                </SwiperSlide>
              ))
            ) : (
              <p className="ml-2">No additional images available.</p>
            )}
          </Swiper>
          <div className="custom-prev absolute top-1/2 -left-6 transform -translate-y-1/2 text-gray-600 rounded-full p-2 cursor-pointer z-10">
            <i className="fas fa-chevron-left"></i>
          </div>
          <div className="custom-next absolute top-1/2 -right-6 transform -translate-y-1/2 text-gray-600 rounded-full p-2 cursor-pointer z-10">
            <i className="fas fa-chevron-right"></i>
          </div>

          <button
            className="absolute top-2 right-2 rounded transition p-2 shadow-none group-hover:opacity-100 group-hover:visible z-20"
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
          >
            <ShoppingBagIcon width={28} color="#881337" />
          </button>
        </div>

        <div className="mt-6 w-full max-w-2xl text-center">
          <h2 className="text-2xl font-semibold">{product.title}</h2>

          <div className="mt-4">
            <p className="text-xl font-medium text-gray-500">
              <span className="line-through font-normal text-red-500 text-lg">
                {product.price}$
              </span>{" "}
              {discountedPrice}$
            </p>
          </div>

          <p
            className={`mt-2 text-lg font-normal ${
              product.stock > 0 ? "text-black" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <div className="mt-4 text-gray-600 text-left">
            <p>{product.description}</p>
          </div>

          <div className="mt-4">
            <h3 className="text-lg flex items-center justify-center font-semibold">
              {renderRatingStars(product.rating)}
            </h3>
          </div>

          <div className="mt-4 text-left">
            <h3 className="text-lg font-semibold">Reviews:</h3>
            {product.reviews && product.reviews.length > 0 ? (
              renderReviews(product.reviews)
            ) : (
              <p className="ml-2">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
