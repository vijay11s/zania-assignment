import { useEffect } from "react";

function Overlay({ image, reset }: { image: string; reset: () => void }) {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key.toLowerCase() === "escape") {
      reset();
    }
  }

  return (
    <div className="fixed flex justify-center items-center inset-0 bg-black bg-opacity-70">
      <img src={image} alt="image" />
    </div>
  );
}

export default Overlay;
