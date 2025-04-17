import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Sun } from "lucide-react";
interface Prayer {
  prayer?: string;
  adhan?: string;
  isNext?: boolean;
  iqama?: string;
  adhanTime?: string;
  iqamahTime?: string;
  onNumberChange?: (value: number) => void;
}

const PrayerTimes: React.FC<{ onNumberChange: (value: number) => void }> = ({
  onNumberChange,
}) => {
  const [loading, setLoading] = useState(true);
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [isRemain, setIsRemain] = useState(false);
  //@ts-ignore
  const [currentTime, setCurrentTime] = useState("");
  //@ts-ignore
  const [currentDate, setCurrentDate] = useState("");
  //@ts-ignore
  const [hijriDate, setHijriDate] = useState("");

  const token = Cookies.get("prayerTimeIdlebTimeAdminToken");

  // Format current time as HH:mm
  const getCurrentHHMM = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  // Helper to convert HH:mm to minutes
  const timeToMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  // Update current time every second
  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch prayer times
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_APIKEY}/api/prayer-times`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPrayers(data.prayers);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // Set current date
  useEffect(() => {
    const date = new Date();
    setCurrentDate(
      date.toLocaleDateString("ar-SA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );

    // Simulate Hijri date - in a real app, you would fetch this
    setHijriDate("١٥ رمضان ١٤٤٥");
  }, []);

  // Check for next prayer and calculate remaining time
  useEffect(() => {
    if (prayers.length === 0) return;

    const interval = setInterval(() => {
      const nowHHMM = getCurrentHHMM();
      const nowMinutes = timeToMinutes(nowHHMM);

      let foundNext = false;

      prayers.forEach((prayer) => {
        if (!prayer.adhan) return;

        const adhanMinutes = timeToMinutes(prayer.adhan);
        const iqamaMinutes = prayer.iqama ? parseInt(prayer.iqama) : 0;

        if (
          nowMinutes >= adhanMinutes &&
          nowMinutes < adhanMinutes + iqamaMinutes &&
          !isRemain
        ) {
          onNumberChange(adhanMinutes + iqamaMinutes - nowMinutes);
          setIsRemain(true);
          foundNext = true;
        }

        if (adhanMinutes + iqamaMinutes - nowMinutes === 0 && isRemain) {
          setIsRemain(false);
        }
      });

      // Update prayers to mark the next one
      const updatedPrayers = prayers.map((prayer) => {
        if (!prayer.adhan) return prayer;

        const adhanMinutes = timeToMinutes(prayer.adhan);
        return {
          ...prayer,
          isNext: adhanMinutes > nowMinutes && !foundNext,
        };
      });

      // Find the first prayer that's next
      const nextPrayerIndex = updatedPrayers.findIndex((p) => p.isNext);
      if (nextPrayerIndex !== -1) {
        // Make sure only one prayer is marked as next
        updatedPrayers.forEach((p, i) => {
          if (i !== nextPrayerIndex) {
            updatedPrayers[i] = { ...p, isNext: false };
          }
        });
        setPrayers(updatedPrayers);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [prayers, isRemain]);

  if (loading) {
    return (
      <div className="flex relative z-10 flex-col items-center justify-center h-[calc(30vh)]">
        <div className="w-[calc(5vw+2.5rem)] h-[calc(5vw+2.5rem)] border-[calc(0.4vw+2px)] border-t-transparent border-amber-600 rounded-full animate-spin"></div>
        <div className="" style={{ fontSize: "calc(1.5vw + 1rem)" }}>
          جاري تحميل مواقيت الصلاة...
        </div>
      </div>
    );
  }

  return (
    <div className="text-right relative z-10" dir="rtl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[calc(1.2vw+0.8rem)]">
        {prayers.map((prayer, index) => (
          <div
            key={index}
            className={`relative overflow-hidden shadow-xl transition-transform duration-300 hover:shadow-xl transform hover:-translate-y-2 bg-gradient-to-br from-amber-50 to-amber-100/90 border-[calc(0.2vw+1px)] border-amber-600/80`}>
            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-[calc(1.5vw+0.75rem)] h-[calc(1.5vw+0.75rem)] border-t-[calc(0.2vw+1px)] border-r-[calc(0.2vw+1px)] border-amber-600 "></div>
            <div className="absolute top-0 left-0 w-[calc(1.5vw+0.75rem)] h-[calc(1.5vw+0.75rem)] border-t-[calc(0.2vw+1px)] border-l-[calc(0.2vw+1px)] border-amber-600 "></div>
            <div className="absolute bottom-0 right-0 w-[calc(1.5vw+0.75rem)] h-[calc(1.5vw+0.75rem)] border-b-[calc(0.2vw+1px)] border-r-[calc(0.2vw+1px)] border-amber-600 "></div>
            <div className="absolute bottom-0 left-0 w-[calc(1.5vw+0.75rem)] h-[calc(1.5vw+0.75rem)] border-b-[calc(0.2vw+1px)] border-l-[calc(0.2vw+1px)] border-amber-600 "></div>

            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: prayer.isNext
                  ? "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20z' fill='none' stroke='%23065f46' stroke-width='1'/%3E%3C/svg%3E\")"
                  : "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20z' fill='none' stroke='%23b45309' stroke-width='1'/%3E%3C/svg%3E\")",
                backgroundSize: "calc(2vw + 20px) calc(2vw + 20px)",
              }}></div>

            <div className="p-[calc(1.2vw+0.3rem)]">
              <div className="flex justify-between items-center">
                <div className="flex items-center justify-center">
                  <div
                    className={`w-[calc(0.6vw+0.3rem)] h-[calc(0.6vw+0.3rem)] rounded-full mr-[calc(0.5vw+0.25rem)] ${
                      prayer.isNext ? "bg-emerald-600" : "bg-amber-600"
                    }`}></div>
                  <span
                    style={{ fontSize: "calc(1.6vw + 1rem)" }}
                    className={`font-bold text-amber-800 mr-[calc(0.5vw+0.2rem)]`}>
                    {prayer.prayer}
                  </span>
                </div>
              </div>

              <div
                className={`relative px-[calc(0.8vw+0.4rem)] py-[calc(0.4vw+0.2rem)] rounded-md ${
                  prayer.isNext
                    ? "bg-emerald-700/10 border border-emerald-600/30"
                    : "bg-amber-700/10 border border-amber-600/30"
                }`}>
                <div className="flex justify-between md:text-[calc(1.1vw+1rem)]">
                  {prayer.prayer === "الشروق" ? (
                    <span
                      className={`${
                        prayer.isNext ? "text-emerald-600" : "text-amber-600"
                      } flex items-center justify-center gap-x-2 font-semibold`}>
                      <Sun className="w-[calc(1.2vw+0.6em)] h-[calc(1.2vw+0.6em)] font-extralight   mt-2" />
                      الساعة: {prayer.adhan}
                    </span>
                  ) : (
                    <span
                      className={`${
                        prayer.isNext ? "text-emerald-600" : "text-amber-600"
                      } flex items-center justify-center gap-x-2 font-semibold`}>
                      <img
                        src="./minaret2.png"
                        className="w-[calc(1.2vw+0.6em)]"
                        alt="Adhan Icon"
                      />
                      أذان: {prayer.adhan}
                    </span>
                  )}

                  {prayer.prayer === "الشروق" ? (
                    <></>
                  ) : (
                    <span
                      className={`${
                        prayer.isNext ? "text-emerald-600" : "text-amber-600"
                      } flex items-center justify-center gap-x-2 font-semibold`}>
                      <img
                        src="./worship.png"
                        className="w-[calc(1.2vw+0.6em)]"
                        alt="Iqamah Icon"
                      />
                      إقامة: {prayer.iqama}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerTimes;
