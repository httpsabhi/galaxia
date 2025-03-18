import { motion } from "framer-motion";
import { useState } from "react";

const Home = () => {
  const [isLaunching, setIsLaunching] = useState(false);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center text-white">
      {/* Background with Animated Stars */}
      <div className="absolute inset-0 bg-[url('/stars.jpg')] bg-cover bg-center opacity-80 animate-[twinkle_3s_infinite_alternate]"></div>

      {/* Black Hole Vortex */}
      <motion.div
        initial={{ scale: 1.2, rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="absolute w-[600px] h-[600px] rounded-full bg-black opacity-60 shadow-lg shadow-blue-800 blur-xl"
      ></motion.div>

      {/* Cosmic Nebula Clouds */}
      <motion.div
        initial={{ opacity: 0.3, scale: 1 }}
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute w-[800px] h-[800px] rounded-full bg-purple-700 opacity-50 blur-2xl"
      ></motion.div>

      {/* Meteor Shower */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: "100vw", y: "-100vh", opacity: 0 }}
          animate={{
            x: [-300, 0, 300],
            y: [200, -200, 200],
            opacity: [0, 1, 0],
          }}
          transition={{
            delay: Math.random() * 4,
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-2 h-12 bg-yellow-400 rounded-full blur-md"
        ></motion.div>
      ))}

      {/* Supernova Explosion (Triggers on Launch) */}
      {isLaunching && (
        <motion.div
          initial={{ opacity: 1, scale: 0.5 }}
          animate={{ opacity: 0, scale: 3 }}
          transition={{ duration: 2 }}
          className="absolute w-[400px] h-[400px] bg-yellow-500 rounded-full blur-3xl"
        ></motion.div>
      )}

      {/* Earth in Distance */}
      <motion.div
        initial={{ scale: 1, rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
        className="absolute bottom-[-100px] left-[-150px] w-[400px] h-[400px] bg-[url('/textures/earth.jpg')] bg-cover rounded-full shadow-lg shadow-blue-700"
      ></motion.div>

      {/* Moon Floating */}
      <motion.div
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-16 right-32 w-[120px] h-[120px] bg-[url('/textures/moon.jpg')] bg-cover rounded-full shadow-md shadow-gray-600"
      ></motion.div>

      {/* Rocket Launching into a Wormhole */}
      <motion.img
        src="/textures/rocket.png"
        alt="Rocket"
        initial={{ y: 0, opacity: 1 }}
        animate={isLaunching ? { y: -800, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 4, ease: "easeInOut" }}
        className="absolute bottom-32 w-[120px] drop-shadow-lg cursor-pointer"
        onMouseEnter={() => setIsLaunching(true)}
      />

      {/* Rocket Exhaust Flame Animation */}
      {isLaunching && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 2 }}
          className="absolute bottom-28 w-20 h-40 bg-orange-400 opacity-70 rounded-full blur-lg"
        ></motion.div>
      )}

      {/* Explore the Supernova Button */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-10 px-6 py-3 text-lg font-semibold bg-purple-600 rounded-lg shadow-md hover:bg-purple-500 transition-all animate-[pulse_2s_infinite]"
      >
        Witness the Supernova
      </motion.button>
    </div>
  );
};

export default Home;
