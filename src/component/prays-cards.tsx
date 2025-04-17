import React from "react";

interface PrayerCardProps {
  prayer: {
    prayer?: string;
    adhan?: string;
    iqama?: string;
    isNext?: boolean;
  };
  index: number;
}

const PrayerCardInline: React.FC<PrayerCardProps> = ({ prayer, index }) => {
  return (
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
          className={`relative px-[calc(1.2vw+0.6rem)] mt-3 py-[calc(0.1vw+0.3rem)] rounded-lg ${
            prayer.isNext
              ? "bg-emerald-700/10 border border-emerald-600/30"
              : "bg-amber-700/10 border border-amber-600/30"
          } shadow-inner`}>
          <div className="flex flex-row justify-between gap-4 text-[calc(1.3vw+1rem)]">
            {/* Adhan Time */}
            <div className="flex items-center justify-center gap-x-3">
              <div className="">
                <img
                  src="./minaret2.png"
                  className="w-[calc(1.4vw+0.8rem)]"
                  alt="Adhan Icon"
                />
              </div>
              <span
                className={`${
                  prayer.isNext ? "text-emerald-700" : "text-amber-700"
                } font-bold`}>
                أذان: <span className="font-extrabold">{prayer.adhan}</span>
              </span>
            </div>

            {/* Iqama Time */}
            <div className="flex items-center justify-center gap-x-3">
              <div className="  ">
                <img
                  src="./worship.png"
                  className="w-[calc(1.4vw+0.8rem)]"
                  alt="Iqamah Icon"
                />
              </div>
              <span
                className={`${
                  prayer.isNext ? "text-emerald-700" : "text-amber-700"
                } font-bold`}>
                إقامة: <span className="font-extrabold">{prayer.iqama}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrayerCardInline;
