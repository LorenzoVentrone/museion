import { useEffect, useState } from "react";
import { PiDeviceRotateDuotone } from "react-icons/pi";

export default function BetterUIMsg() {
  const [show, setShow] = useState(false);

  // Check viewport size and orientation
  const check = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setShow(w < 600 && h > w && (w < 600 || h < 840));
  };

  useEffect(() => {
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);

    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  // Do NOT hide on orientation change anymore

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="flex flex-col items-center p-6 rounded-xl bg-gray-800/90 shadow-xl pointer-events-auto relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 text-2xl font-bold focus:outline-none"
          onClick={() => setShow(false)}
          aria-label="Close"
        >
          &times;
        </button>
        {/* Animated device rotate icon */}
        <div className="mb-4">
          <PiDeviceRotateDuotone
            className="text-6xl text-gray-300 apple-rotate-spin"
            style={{ display: "block" }}
          />
        </div>
        <div className="text-gray-100 text-lg font-semibold mb-1 text-center">
          Rotate your device
        </div>
        <div className="text-gray-300 text-sm text-center">
          For the best experience, please use landscape mode.
        </div>
      </div>
      <style>
        {`
          .apple-rotate-spin {
            animation: apple-rotate-spin 1.6s cubic-bezier(.68,-0.55,.27,1.55) infinite;
            /* Center the rotation axis */
            transform-origin: 50% 50%;
          }
          @keyframes apple-rotate-spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(-180deg);
            }
          }
        `}
      </style>
    </div>
  );
}