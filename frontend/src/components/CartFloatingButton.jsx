// src/components/CartFloatingButton.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function CartFloatingButton() {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Link
      to="/carrito"
      className="
        fixed bottom-6 right-6
        bg-blue-700 text-white
        w-14 h-14 
        rounded-full shadow-lg
        flex items-center justify-center
        hover:bg-blue-800 transition
        z-50
      "
    >
      <ShoppingCart size={24} />

      {totalItems > 0 && (
        <span
          className="
            absolute -top-1 -right-1
            bg-emerald-500 text-white 
            text-xs font-bold
            px-2 py-[2px]
            rounded-full
            shadow
          "
        >
          {totalItems}
        </span>
      )}
    </Link>
  );
}
