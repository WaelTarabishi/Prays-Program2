import { motion } from "framer-motion";

const ReaminingTime = ({ remainingTime }: { remainingTime: number }) => {
  // Format remaining time for Iqama
  const formatRemainingTime = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes * 60) % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  return (
    <motion.div
      className="flex justify-center mb-9  "
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <motion.div
        className="flex items-center gap-3 bg-gradient-to-r from-amber-700/10 to-amber-600/10 rounded-lg px-5 py-2 border border-amber-600/20 shadow-sm"
        animate={{
          boxShadow:
            remainingTime < 5
              ? [
                  "0 1px 2px rgba(0,0,0,0.05)",
                  "0 1px 10px rgba(180,83,9,0.2)",
                  "0 1px 2px rgba(0,0,0,0.05)",
                ]
              : "0 1px 2px rgba(0,0,0,0.05)",
        }}
        transition={{
          duration: 1.5,
          repeat: remainingTime < 5 ? Infinity : 0,
        }}>
        <motion.div
          className="bg-amber-50 px-4 py-1 rounded-md text-[calc(0.8vw+0.7rem)] mr-2 font-bold"
          style={{
            background: remainingTime < 1 ? "#fef3c7" : "#fef3c7",
            backgroundSize: "200% 100%",
          }}
          animate={{
            color:
              remainingTime < 1 ? ["#b45309", "#ef4444", "#b45309"] : "#b45309",
            backgroundPosition:
              remainingTime < 1 ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
            scale: remainingTime < 3 ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: remainingTime < 1 ? 1.5 : 0.8,
            repeat: remainingTime < 3 ? Infinity : 0,
            repeatType: "reverse",
          }}>
          {formatRemainingTime(remainingTime)}
        </motion.div>

        {/* <div className="h-[calc(0.8vw+1rem)] w-[1px] bg-amber-600/30"></div> */}

        <div className="text-amber-800 font-bold text-[calc(0.7vw+0.5rem)] ml-1">
          الوقت المتبقي للإقامة
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReaminingTime;
