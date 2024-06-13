import "./Loader.css";

const Loader = () => {
  return (
    <div className="fixed top-[50%] z-50 left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-[100vh] backdrop-blur-sm grid place-items-center text-black-900">
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loader;
