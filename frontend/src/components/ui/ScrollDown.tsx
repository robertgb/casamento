import { useEffect, useState } from "react";

interface ScrollDownProps {
  positionY: number;
}

function ScrollDown({ positionY }: ScrollDownProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > positionY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [positionY]);

  const scrollToPosition = () => {
    window.scrollTo({
      top: 1000, // posição em pixels do topo da página
      behavior: "smooth", // animação suave
    });
  };

  return (
    <button
      type="button"
      className={`bottom-0 right-24 duration-500 ease-in-out animate-fadeIn ${
        isScrolled ? "hidden" : "block"
      }`}
      style={{ position: "absolute" }}
      onClick={scrollToPosition}
    >
      <span className="text-white text-xl font-medium font-serif italic">
        Scroll
      </span>
      <div className="animate-loading"></div>
    </button>
  );
}

export default ScrollDown;
