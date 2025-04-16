import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
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
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const token = Cookies.get("prayerTimeIdlebTimeAdminToken");
  let isRemain = false;
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
  // console.log(import.meta.env.VITE_APP_SECRET);
  // console.log(token);
  // Check every minute if current time is between adhan and iqama
  useEffect(() => {
    const interval = setInterval(() => {
      const nowHHMM = getCurrentHHMM();
      const nowMinutes = timeToMinutes(nowHHMM);

      prayers.forEach((prayer) => {
        //@ts-ignore
        const adhanMinutes = timeToMinutes(prayer.adhan);
        const iqamaMinutes = prayer.iqama;

        if (
          nowMinutes >= adhanMinutes &&
          //@ts-ignore
          nowMinutes < adhanMinutes + parseInt(iqamaMinutes) &&
          isRemain == false
        ) {
          //@ts-ignore
          onNumberChange(adhanMinutes + parseInt(iqamaMinutes) - nowMinutes);
          isRemain = true;
        }
        //@ts-ignore
        if (adhanMinutes + parseInt(iqamaMinutes) - nowMinutes == 0) {
          isRemain = false;
        }
      });
    }, 1000); // every 1 minute

    return () => clearInterval(interval);
  }, [prayers]);

  // Update clock every second
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      const s = now.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${h}:${m}:${s}`);
    };

    updateClock();
    const timer = setInterval(updateClock, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_SECRET}/api/prayer-times`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPrayers(data.prayers);
        console.log(prayers);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  //@ts-ignore
  const [currentDate, setCurrentDate] = useState("");
  //@ts-ignore
  const [hijriDate, setHijriDate] = useState("");
  //@ts-ignore
  const [currentTime, setCurrentTime] = useState("");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    // Set current Gregorian date
    const date = new Date();
    setCurrentDate(
      date.toLocaleDateString("ar-SA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );

    // Simulate fetching prayer times
    // In a real app, you would fetch from an API like Aladhan API
    const mockPrayerTimes = {
      Fajr: "04:30",
      Sunrise: "06:15",
      Dhuhr: "12:30",
      Asr: "15:45",
      Maghrib: "18:20",
      Isha: "19:45",
    };

    // Simulate Hijri date
    setHijriDate("١٥ رمضان ١٤٤٥");

    // Update prayer times and determine next prayer
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    const updatedPrayers = prayers.map((prayer) => {
      const [hour, minute] = mockPrayerTimes[
        //@ts-ignore
        prayer.name as keyof typeof mockPrayerTimes
      ]
        .split(":")
        .map(Number);
      const prayerTimeInMinutes = hour * 60 + minute;

      return {
        ...prayer,
        //@ts-ignore
        time: mockPrayerTimes[prayer.name as keyof typeof mockPrayerTimes],
        isNext: prayerTimeInMinutes > currentTimeInMinutes,
      };
    });

    // Find the next prayer
    const nextPrayerIndex = updatedPrayers.findIndex((prayer) => prayer.isNext);
    if (nextPrayerIndex !== -1) {
      updatedPrayers[nextPrayerIndex].isNext = true;

      // Calculate remaining time until next prayer
      const [nextHour, nextMinute] = updatedPrayers[nextPrayerIndex].time
        .split(":")
        .map(Number);
      const nextPrayerTimeInMinutes = nextHour * 60 + nextMinute;
      const remainingMinutes = nextPrayerTimeInMinutes - currentTimeInMinutes;

      const hours = Math.floor(remainingMinutes / 60);
      const minutes = remainingMinutes % 60;

      updatedPrayers[
        nextPrayerIndex
        //@ts-ignore
      ].remainingTime = `${hours} ساعة و ${minutes} دقيقة`;

      // Reset any other prayers that might be marked as next
      for (let i = 0; i < updatedPrayers.length; i++) {
        if (i !== nextPrayerIndex) {
          updatedPrayers[i].isNext = false;
        }
      }
    }

    setPrayers(updatedPrayers);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex  relative z-10 flex-col items-center justify-center h-[calc(30vh)]">
        <div className="w-[calc(5vw+2.5rem)] h-[calc(5vw+2.5rem)] border-[calc(0.4vw+2px)] border-t-transparent border-amber-600 rounded-full animate-spin"></div>
        <div className="" style={{ fontSize: "calc(1.5vw + 1rem)" }}>
          جاري تحميل مواقيت الصلاة...
        </div>
      </div>
    );
  }

  return (
    <div className="text-right relative  z-10" dir="rtl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-[calc(1.2vw+0.8rem)]">
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
                    className={`w-[calc(0.6vw+0.3rem)] h-[calc(0.6vw+0.3rem)] rounded-full mr-[calc(0.5vw+0.25rem)] bg-amber-600`}></div>
                  <span
                    style={{ fontSize: "calc(1.6vw + 1rem)" }}
                    className={`font-bold text-amber-800 mr-[calc(0.5vw+0.2rem)]`}>
                    {prayer.prayer}
                  </span>
                </div>
              </div>

              <div
                className={`relative px-[calc(0.8vw+0.4rem)] py-[calc(0.4vw+0.2rem)] rounded-md bg-amber-700/10 border border-amber-600/30`}>
                <div className="flex justify-between md:text-[calc(1.1vw+1rem)]">
                  <span className="text-amber-600 flex items-center justify-center gap-x-2 font-semibold">
                    <img
                      src="./minaret2.png"
                      className="w-[calc(1.2vw+0.6em)]"
                      alt="Adhan Icon"
                    />
                    أذان: {prayer.adhan}
                  </span>
                  <span className="text-amber-600 flex items-center justify-center gap-x-2 font-semibold">
                    <img
                      src="./worship.png"
                      className="w-[calc(1.2vw+0.6em)]"
                      alt="Iqamah Icon"
                    />
                    إقامة: {prayer.iqama}
                  </span>
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
