import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import style from "./Home.module.css";
import withWrapper from "../HOC/withWrapper";

function SwiperProduct({ onLoadingComplete }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "mens-shirts",
    "mens-shoes",
    "womens-dresses",
    "womens-shoes",
    "mens-watches",
    "womens-watches",
    "mens-sunglasses",
    "womens-bags",
    "womens-jewellery",
    "fragrances",
  ];

  const getProducts = async () => {
    try {
      const allProducts = [];
      for (const category of categories) {
        const { data } = await axios.get(
          `https://dummyjson.com/products/category/${category}`
        );
        allProducts.push(...data.products.slice(0, 2));
      }
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      if (onLoadingComplete) onLoadingComplete();
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mt-28 text-rose-900 text-center poppins-medium">
        Best Sellers
      </h2>
      <div className="w-full max-w-4xl">
        {loading ? (
          <div className="text-center">
            <div className="spinner"></div>
          </div>
        ) : (
          <Swiper
            className={style.swiper}
            spaceBetween={10}
            slidesPerView={4}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            modules={[Autoplay]}
            direction="horizontal"
          >
            {products.length > 0 ? (
              products.map((product) => (
                <SwiperSlide key={product.id}>
                  <Link to={`/Product`} className="block">
                    <div className="p-4 shadow-md cursor-pointer">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-auto max-w-[150px] md:max-w-[200px] lg:max-w-[250px] object-cover"
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            ) : (
              <p>No products available</p>
            )}
          </Swiper>
        )}
      </div>
    </div>
  );
}

const WrapperNavbar = withWrapper(SwiperProduct);

export default WrapperNavbar;
