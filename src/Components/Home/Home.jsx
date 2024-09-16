import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import About from "./About";
import backgroundimg from "../../images/store.png";
import SwiperProduct from "./SwiperProduct";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="">
        <Hero imageUrl={backgroundimg} />
      </div>
      <About />
      {loading ? (
        <div className="text-center mt-8">
          <div className="spinner"></div>
        </div>
      ) : (
        <SwiperProduct onLoadingComplete={() => setLoading(false)} />
      )}
    </>
  );
}

export default Home;
