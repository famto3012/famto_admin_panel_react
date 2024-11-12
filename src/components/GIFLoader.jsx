import { Player } from "@lottiefiles/react-lottie-player";
import loaderAnimation from "../assets/animation.json";

const GIFLoader = () => {
  return (
    <figure className="h-[100vh] ps-[270px] flex items-center justify-center">
      <Player
        autoplay
        loop
        src={loaderAnimation}
        style={{ height: "300px", width: "300px" }}
      />
    </figure>
  );
};

export default GIFLoader;
