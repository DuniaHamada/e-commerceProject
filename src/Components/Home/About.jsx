import { useEffect } from "react";
import Image from "../../images/H.png";
import AOS from "aos";
import "aos/dist/aos.css";

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <div
        className="flex flex-col lg:flex-row pt-10 gap-12 poppins-medium max-w-[calc(100%-30%)] mx-auto items-start"
        data-aos="fade-up"
      >
        <div className="flex-1 mt-28">
          <h2 className="text-2xl font-semibold mb-8 text-rose-900">
            Our Story
          </h2>
          <p className="mb-4 text-stone-600 text-[15px] text-justify">
            At DUNIA, we pride ourselves on offering cutting-edge and
            eco-friendly products that are built to last. Our team is committed
            to providing exceptional service and ensuring a seamless shopping
            experience for you. Dive into our website to discover more about our
            brand and commitment to quality.
          </p>
          <p className="mb-4 text-stone-600 text-[15px] text-justify">
            At the heart of our mission is the dedication to enhancing your
            lifestyle with products that blend functionality, design, and
            sustainability. We strive to exceed your expectations by continually
            improving our offerings and supporting our community with every
            purchase you make.
          </p>
        </div>
        <div className="flex-1" data-aos="zoom-in">
          <img
            src={Image}
            alt="Shopping Illustration"
            className="w-full h-[480px] max-w-[500px]"
          />
        </div>
      </div>
    </>
  );
}

export default About;
