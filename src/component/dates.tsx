import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Dates = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hijriDate, setHijriDate] = useState("");

  const formatArabicDate = () => {
    const today = new Date();
    const day = today.getDate();
    const year = today.getFullYear();
    const months = [
      "كانون الثاني",
      "شباط",
      "آذار",
      "نيسان",
      "أيار",
      "حزيران",
      "تموز",
      "آب",
      "أيلول",
      "تشرين الأول",
      "تشرين الثاني",
      "كانون الأول",
    ];

    const arabicNumbers = (num: number) =>
      num.toString().replace(/\d/g, (d: any) => "٠١٢٣٤٥٦٧٨٩"[d]);

    const arabicDay = arabicNumbers(day);
    const arabicYear = arabicNumbers(year);
    const month = months[today.getMonth()]; // months are 0-indexed

    return `${arabicDay} ${month} ${arabicYear} م`;
  };

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
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
  }, [currentTime]);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <motion.div
      className="text-center  "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}>
      <motion.div
        className="text-[calc(1.5vw+2.5rem)] text-amber-700 font-bold"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}>
        {formattedTime}
      </motion.div>

      {/* Hijri Date Display */}
      <motion.div
        className="md:text-[calc(1vw+0.5rem)] rounded-md bg-amber-700/10 border border-amber-600/30 text-amber-600 font-bold px-3 py-1 shadow-sm"
        whileHover={{
          backgroundColor: "rgba(180, 83, 9, 0.15)",
          scale: 1.02,
        }}
        transition={{ duration: 0.3 }}>
        <div className="flex justify-between w-full">
          <span className="text-left">{formatArabicDate()}</span>

          <span className="text-right">{hijriDate}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dates;
