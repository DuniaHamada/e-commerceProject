const Hero = ({ imageUrl }) => {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className=" absolute top-[250px] left-[600px] flex flex-col items-center justify-center text-center">
        <div className="text-3xl text-rose-900 font-medium font-lobster animate-fadeInScale">
          Welcome to Dunia Store
        </div>
        <div className="mt-2 text-2xl text-stone-600 font-medium typing-animation ">
          <span className="line line1">
            Explore our unique collections and find something special just for
            you.
          </span>
          <span className="line line2">
            Discover a World of Convenience and Style Right at Your Fingertips.
          </span>
          <span className="line line3">
            Shop smart, shop stylish, shop comfortably.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
