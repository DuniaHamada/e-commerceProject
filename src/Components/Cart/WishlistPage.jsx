import { useSelector } from "react-redux";
import ProductCard from "../Product/ProductCard";
import withWrapper from "../HOC/withWrapper";

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist.products);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Your Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))
        ) : (
          <p>Your wishlist is empty!</p>
        )}
      </div>
    </div>
  );
};

const WrapperNavbar = withWrapper(WishlistPage);
export default WrapperNavbar;
