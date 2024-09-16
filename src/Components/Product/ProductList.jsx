import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import withWrapper from "../HOC/withWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleRows, setVisibleRows] = useState(3);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const categories = [
    "All Products",
    "Mens-shirts",
    "Mens-shoes",
    "Womens-dresses",
    "Womens-shoes",
    "Mens-watches",
    "Womens-watches",
    "Womens-bags",
    "Womens-jewellery",
    "Fragrances",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = [];
        for (const category of categories.slice(1)) {
          const response = await fetch(
            `https://dummyjson.com/products/category/${category}`
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();

          if (!Array.isArray(data.products)) {
            throw new Error("Expected an array of products");
          }

          allProducts.push(...data.products);
        }

        const filteredProducts = allProducts.filter(
          (product) => product.title !== "New Product" && product.price !== 10
        );

        const uniqueProducts = Array.from(
          new Map(
            filteredProducts.map((product) => [
              `${product.images[0]}-${product.title}-${product.price}`,
              product,
            ])
          ).values()
        );

        const first80Products = uniqueProducts.slice(0, 80);

        setProducts(first80Products);
        setFilteredProducts(first80Products);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const showMoreRows = () => {
    setVisibleRows((prevRows) => prevRows + 3);
  };

  const handleCategoryChange = async (category) => {
    if (category === "All Products") {
      setFilteredProducts(products);
      setSelectedCategory("");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      if (!Array.isArray(data.products)) {
        throw new Error("Expected an array of products");
      }

      const filteredProducts = data.products.filter(
        (product) => product.title !== "New Product" && product.price !== 10
      );

      const uniqueProducts = Array.from(
        new Map(
          filteredProducts.map((product) => [
            `${product.images[0]}-${product.title}-${product.price}`,
            product,
          ])
        ).values()
      );

      setFilteredProducts(uniqueProducts);
      setSelectedCategory(category);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const productsToShow = filteredProducts.slice(0, visibleRows * 3);

  return (
    <div className="p-6">
      <div className="mb-4 ">
        <Swiper
          spaceBetween={10}
          slidesPerView={5}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="mb-4 "
        >
          {categories.map((category) => (
            <SwiperSlide key={category}>
              <button
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded poppins-medium hover:scale-110 transition-transform duration-60 ${
                  selectedCategory === category
                    ? " text-gray-500 "
                    : " text-rise "
                }`}
              >
                {category.replace(/-/g, " ")}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {error ? (
            <div className="text-red-500">Error: {error}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 my-8">
                {productsToShow.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.images[0]}
                    name={product.title}
                    price={product.price}
                  />
                ))}
              </div>
              {visibleRows * 3 < filteredProducts.length && (
                <button
                  onClick={showMoreRows}
                  className="mt-4 px-4 py-2 poppins-medium text-gray-600 rounded hover:scale-110 transition-transform duration-600 "
                >
                  Show More ...
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

const WrapperNavbar = withWrapper(ProductList);
export default WrapperNavbar;
