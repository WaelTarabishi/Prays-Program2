import { motion } from "framer-motion";

const PrayerTimesSentence = () => {
  return (
    <motion.div
      className="relative flex justify-center md:my-0 my-[calc(1vw+0.2rem)] bg-gradient-to-br from-amber-50 to-amber-100/90 border-[calc(0.2vw+1px)] border-amber-600/80"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}>
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20z' fill='none' stroke='%23b45309' stroke-width='1'/%3E%3C/svg%3E\")",
          backgroundSize: "calc(2vw + 20px) calc(2vw + 20px)",
        }}></div>

      {/* Decorative mosque silhouettes */}
      <div className="absolute bottom-0 left-0 w-[calc(8vw+2rem)] h-[calc(4vw+1rem)] opacity-15 pointer-events-none">
        <img
          src="./mosque-silhouette-right.png"
          alt=""
          className="w-full h-full object-contain"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>

      <div className="absolute bottom-0 right-0 w-[calc(8vw+2rem)] h-[calc(4vw+1rem)] opacity-15 pointer-events-none">
        <img
          src="./mosque-silhouette-right.png"
          alt=""
          className="w-full h-full object-contain"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>

      <div className="relative px-[calc(3vw+1rem)] py-[calc(0.5vw)] shadow-lg w-full overflow-hidden">
        {/* Animated corner decorations */}
        <motion.div
          className="absolute top-0 left-0 w-[calc(1.5vw+0.75rem)] h-[calc(1.5vw+0.75rem)] border-t-[calc(0.2vw+1px)] border-l-[calc(0.2vw+1px)] border-amber-600"
          animate={{ x: [-5, 0], y: [-5, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.1 }}></motion.div>

        <motion.div
          className="absolute top-0 right-0 w-[calc(1.5vw+0.75rem)] h-[calc(1.5vw+0.75rem)] border-t-[calc(0.2vw+1px)] border-r-[calc(0.2vw+1px)] border-amber-600"
          animate={{ x: [5, 0], y: [-5, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.2 }}></motion.div>

        <motion.div
          className="absolute bottom-0 left-0 w-[calc(1.5vw+0.75rem)] h-[calc(1.5vw+0.75rem)] border-b-[calc(0.2vw+1px)] border-l-[calc(0.2vw+1px)] border-amber-600"
          animate={{ x: [-5, 0], y: [5, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.3 }}></motion.div>

        <motion.div
          className="absolute bottom-0 right-0 w-[calc(1.5vw+0.75rem)] h-[calc(1.5vw+0.75rem)] border-b-[calc(0.2vw+1px)] border-r-[calc(0.2vw+1px)] border-amber-600"
          animate={{ x: [5, 0], y: [5, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5, delay: 0.4 }}></motion.div>

        {/* Prayer Times heading with decorative elements */}
        <div className="relative z-10 px-[calc(1vw+1rem)]">
          <motion.h2
            className="md:text-[calc(2vw+2rem)] text-[calc(2vw+1rem)] font-bold text-amber-800 text-center font-arabic py-[calc(0.5vw+0.5rem)]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}>
            مسجد علي بن أبي طالب
          </motion.h2>

          {/* <div className="text-center mt-5 pb-5 text-amber-700 text-[calc(0.7vw+0.5rem)] font-arabic font-semibold pointer-events-auto select-text">
  <div>مسجد علي بن أبي طالب</div> */}
          {/* Decorative divider below the text */}
          <motion.div
            className="flex justify-center items-center gap-2 -mt-[calc(0.5vw)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}>
            <div className="h-[2px] bg-amber-600/40 flex-grow max-w-[calc(10vw+2rem)]"></div>
            <div className="w-[8px] h-[8px] rounded-full bg-amber-600/60"></div>
            <div className="h-[2px] bg-amber-600/40 flex-grow max-w-[calc(10vw+2rem)]"></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PrayerTimesSentence;
