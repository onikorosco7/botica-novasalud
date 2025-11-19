import { motion } from "framer-motion";

export default function LoaderOverlay({ text = "Cargando..." }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed inset-0 
        bg-black/40 
        backdrop-blur-sm 
        flex flex-col 
        items-center 
        justify-center 
        z-[9999]
      "
      aria-label="Pantalla de carga"
    >
      {/* SPINNER */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        className="
          w-20 h-20 
          border-4 
          border-white/50 
          border-t-green-400 
          rounded-full 
          animate-spin
          shadow-lg
        "
      />

      {/* TEXTO DE CARGA */}
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-white mt-6 text-lg font-semibold tracking-wide drop-shadow-lg"
      >
        {text}
      </motion.p>
    </motion.div>
  );
}
