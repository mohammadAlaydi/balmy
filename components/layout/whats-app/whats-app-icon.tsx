"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function WhatsAppIcon() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        type: "spring",
        stiffness: 200,
      }}
      className="fixed bottom-5 right-5 z-[1000]"
    >
      <Link href="https://wa.me" className="block">
        <motion.div
          className="relative flex items-center justify-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px]"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Main icon with wavy effect */}
          <motion.div
            className="relative z-10 flex items-center justify-center text-[#25D366]"
            animate={{
              // Wavy effect - combination of scale and rotation
              scale: [1, 1.08, 1],
              rotate: [0, 5, -5, 5, 0],
              y: [0, -3, 3, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              rotate: [0, -15, 15, -15, 0],
              scale: 1.2,
              y: [0, -5, 5, -5, 0],
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaWhatsapp
                className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-[#25D366] relative z-10"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
