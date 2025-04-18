import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "../App.css";
import Dates from "./dates";
import Footer from "./footer";
import Hadith from "./hadith";
import Header from "./header";
import PrayerTimes from "./prays-time";
function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  //@ts-ignore
  const [hijriDate, setHijriDate] = useState("");
  const [remainingTime, setRemainingTime] = useState<number>(0); // Example: 15 minutes until Iqama
  //@ts-ignore
  const [currentPrayer, setCurrentPrayer] = useState("العصر"); // Example prayer
  const today = new Date();
  //@ts-ignore
  const currentDate = `${today.getDate()}-${
    today.getMonth() + 1
  }-${today.getFullYear()}`;
  //@ts-ignore
  const handleRemainingTime = (value) => {
    setRemainingTime(value);
  };

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());

      // This is a placeholder. In a real implementation, you would calculate
      // the actual remaining time until Iqama based on prayer times and Iqama settings
      if (remainingTime > 0) {
        setRemainingTime((prev) => Math.max(0, prev - 1 / 60)); // Decrease by 1 second (1/60 of a minute)
      }
    }, 1000);

    // Get Hijri date
    const getHijriDate = () => {
      try {
        // Using Intl.DateTimeFormat for Hijri calendar if supported
        const hijri = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
          day: "numeric",
          month: "long",
          year: "numeric",
          weekday: "long",
        }).format(currentTime);
        setHijriDate(hijri);
      } catch (error) {
        console.error("Error getting Hijri date:", error);
        setHijriDate("");
      }
    };

    getHijriDate();

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [currentTime, remainingTime]);

  // Format remaining time for Iqama
  const formatRemainingTime = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes * 60) % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-amber-100/50 select-none pointer-events-none px-[calc(2vw+1rem)]  ">
      <div className="pt-[calc(1vw+1rem)] flex flex-col gap-y-[calc(1vw+1rem)]">
        <Header />
        <Dates />
        <PrayerTimes onNumberChange={handleRemainingTime} />
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
              className="bg-amber-50 px-4 py-1 rounded-md text-[calc(1.4vw+0.5rem)] mr-2 font-bold"
              style={{
                background: remainingTime < 1 ? "#fef3c7" : "#fef3c7",
                backgroundSize: "200% 100%",
              }}
              animate={{
                color:
                  remainingTime < 1
                    ? ["#b45309", "#ef4444", "#b45309"]
                    : "#b45309",
                backgroundPosition:
                  remainingTime < 1
                    ? ["0% 50%", "100% 50%", "0% 50%"]
                    : "0% 50%",
                scale: remainingTime < 3 ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: remainingTime < 1 ? 1.5 : 0.8,
                repeat: remainingTime < 3 ? Infinity : 0,
                repeatType: "reverse",
              }}>
              {formatRemainingTime(remainingTime)}
            </motion.div>

            <div className="text-amber-800 font-bold text-[calc(1.4vw+0.5rem)] ml-1">
              الوقت المتبقي للإقامة
            </div>
          </motion.div>
        </motion.div>{" "}
      </div>
      <Hadith />
      <Footer />
    </div>
  );
}

export default Home;
