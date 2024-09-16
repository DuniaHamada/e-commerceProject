import { Link, useNavigate } from "react-router-dom";
import {
  HeartIcon,
  TrashIcon,
  ShoppingBagIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../app/features/wishlistSlice";
import { addToCart, removeFromCart } from "../../app/features/Cart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ id, image, name, price, discount }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector((state) => state.wishlist.products);
  const cartItems = useSelector((state) => state.cart.products);

  const handleViewDetails = () => {
    navigate(`/products/${id}`);
  };

  const handleAddToWishlist = () => {
    const isInWishlist = wishlistItems.find((item) => item.id === id);
    const isInCart = cartItems.find((item) => item.id === id);

    if (!isInWishlist) {
      dispatch(addToWishlist({ id, image, name, price }));
      if (isInCart) {
        dispatch(removeFromCart({ id }));
      }
      toast.success(`${name} added to wishlist!`, {
        icon: <CheckCircleIcon className="text-gray-400 w-10" />,

        className: "bg-white text-gray-400",
        progressClassName: "bg-gray-400",
      });
    } else {
      dispatch(removeFromWishlist({ id }));
      toast.error(`${name} removed from wishlist!`, {
        className: "bg-white text-gray-400",
        progressClassName: "bg-gray-400",
      });
    }
  };

  const handleAddToCart = () => {
    const isInCart = cartItems.find((item) => item.id === id);
    const isInWishlist = wishlistItems.find((item) => item.id === id);

    if (!isInCart) {
      dispatch(addToCart({ id, image, name, price }));
      if (isInWishlist) {
        dispatch(removeFromWishlist({ id }));
      }
      toast.success(`${name} added to cart!`, {
        icon: <CheckCircleIcon className="text-gray-400 w-10" />,
        className: "bg-white text-gray-400",
        progressClassName: "bg-gray-400",
      });
    }
  };

  return (
    <div className="group relative shadow-2xl rounded-lg flex flex-col p-4 h-80 text-center poppins-medium justify-between hover:scale-110 transition-transform duration-60">
      <Link to={`/products/${id}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover mb-4 rounded-t-lg"
        />
        {discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        <div className="flex-grow flex flex-col justify-between gap-5">
          <h3 className="font-medium text-base">{name}</h3>
          <p className="text-gray-600">${price}</p>
        </div>
      </Link>

      <div className="absolute right-2 top-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition flex space-x-2">
        <button
          className="rounded"
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
        >
          {cartItems.find((item) => item.id === id) ? (
            <TrashIcon width={20} color="#881337" />
          ) : (
            <ShoppingBagIcon width={25} color="#881337" />
          )}
        </button>
        <button
          className="rounded"
          onClick={(e) => {
            e.preventDefault();
            handleAddToWishlist();
          }}
        >
          {wishlistItems.find((item) => item.id === id) ? (
            <TrashIcon width={20} color="#881337" />
          ) : (
            <HeartIcon width={24} color="#881337" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
