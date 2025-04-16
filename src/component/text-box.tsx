import React, { useEffect, useState } from "react";

// Collection of authentic hadiths with Arabic and English translations
const hadiths = [
  {
    arabic: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى",
    english:
      "Actions are judged by intentions, and each person will be rewarded according to their intentions.",
    narrator: "رواه البخاري ومسلم",
  },
  {
    arabic: "من حسن إسلام المرء تركه ما لا يعنيه",
    english:
      "Part of the perfection of one's Islam is leaving that which does not concern him.",
    narrator: "رواه الترمذي",
  },
  {
    arabic: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه",
    english:
      "None of you truly believes until he loves for his brother what he loves for himself.",
    narrator: "رواه البخاري ومسلم",
  },
  {
    arabic: "الطهور شطر الإيمان، والحمد لله تملأ الميزان",
    english:
      "Cleanliness is half of faith and Alhamdulillah (praise be to Allah) fills the scale.",
    narrator: "رواه مسلم",
  },
  {
    arabic:
      "اتق الله حيثما كنت، وأتبع السيئة الحسنة تمحها، وخالق الناس بخلق حسن",
    english:
      "Fear Allah wherever you are, follow a bad deed with a good deed to erase it, and treat people with good character.",
    narrator: "رواه الترمذي",
  },
];

const IslamicBox = ({
  title,
  className = "",
}: {
  title: string;
  className?: string;
  rightContent?: React.ReactNode;
  leftContent?: React.ReactNode;
}) => {
  const [hadith, setHadith] = useState(hadiths[0]);

  // Select a random hadith on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * hadiths.length);
    setHadith(hadiths[randomIndex]);
  }, []);

  // Custom hadith display component
  const HadithDisplay = () => (
    <div className="flex  flex-col space-y-4">
      <div className="text-[calc(1.5vw+1rem)]  font-arabic leading-relaxed text-amber-900">
        {hadith.arabic}
      </div>

      <div className="text-xs text-amber-700 text-[calc(1.5vw+1rem)]  font-semibold mt-2">
        {hadith.narrator}
      </div>
    </div>
  );

  return (
    <div className="grid relative grid-cols-2  z-10   px-32">
      <div className="grid-cols-1 w-[calc(45vw)] p-6 flex flex-col justify-center">
        <h3 className="text-2xl font-arabic text-amber-900 mb-4 text-center">
          حديث نبوي شريف
        </h3>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/90 rounded-lg p-6 shadow-md border border-amber-700/30">
          <HadithDisplay />
        </div>
      </div>

      <div
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23805500' stroke-width='1'/%3E%3C/svg%3E\")",
          backgroundSize: "calc(2vw + 30px) calc(2vw + 30px)",
        }}
        className={`relative w-[calc(45vw)] mx-auto my-[calc(2vw+1rem)]  ${className}`}>
        {/* Outer decorative frame */}
        <div className="absolute inset-0 -m-[calc(0.8vw+0.4rem)] bg-amber-800/10 rounded-xl"></div>

        {/* Main container with gradient border and texture */}
        <div className="relative border-[calc(0.5vw+2px)] border-amber-700/90 bg-gradient-to-br from-amber-50 to-amber-100/90 rounded-lg p-[calc(1vw+0.5rem)] shadow-xl">
          {/* Side decorative elements */}
          <div className="absolute top-1/4 -left-[calc(0.6vw+1.2rem)] w-[calc(1.2vw+0.6rem)] h-[calc(1.2vw+0.6rem)] bg-amber-700 rounded-full flex items-center justify-center">
            <div className="w-[calc(0.8vw+0.4rem)] h-[calc(0.8vw+0.4rem)] bg-emerald-700 rounded-full"></div>
          </div>

          <div className="absolute top-1/4 -right-[calc(0.6vw+1.2rem)] w-[calc(1.2vw+0.6rem)] h-[calc(1.2vw+0.6rem)] bg-amber-700 rounded-full flex items-center justify-center">
            <div className="w-[calc(0.8vw+0.4rem)] h-[calc(0.8vw+0.4rem)] bg-emerald-700 rounded-full"></div>
          </div>

          <div className="absolute bottom-1/4 -left-[calc(0.6vw+1.2rem)] w-[calc(1.2vw+0.6rem)] h-[calc(1.2vw+0.6rem)] bg-amber-700 rounded-full flex items-center justify-center">
            <div className="w-[calc(0.8vw+0.4rem)] h-[calc(0.8vw+0.4rem)] bg-emerald-700 rounded-full"></div>
          </div>

          <div className="absolute bottom-1/4 -right-[calc(0.6vw+1.2rem)] w-[calc(1.2vw+0.6rem)] h-[calc(1.2vw+0.6rem)] bg-amber-700 rounded-full flex items-center justify-center">
            <div className="w-[calc(0.8vw+0.4rem)] h-[calc(0.8vw+0.4rem)] bg-emerald-700 rounded-full"></div>
          </div>

          {/* Left and right decorative borders */}
          <div
            className="absolute left-[calc(1vw+0.25rem)] top-[calc(3vw+2.3rem)] bottom-[calc(3vw+1rem)] w-[calc(0.4vw+0.2rem)] bg-repeat-y"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='10' height='40' viewBox='0 0 10 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 0 L10 5 L5 10 L0 5 L5 0 Z M5 10 L10 15 L5 20 L0 15 L5 10 Z M5 20 L10 25 L5 30 L0 25 L5 20 Z M5 30 L10 35 L5 40 L0 35 L5 30 Z' fill='%23b45309' fill-opacity='0.4' /%3E%3C/svg%3E\")",
              backgroundSize: "100% auto",
            }}></div>

          <div
            className="absolute right-[calc(1vw+0.25rem)] top-[calc(3vw+2.3rem)] bottom-[calc(3vw+1rem)] w-[calc(0.4vw+0.2rem)] bg-repeat-y"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='10' height='40' viewBox='0 0 10 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 0 L10 5 L5 10 L0 5 L5 0 Z M5 10 L10 15 L5 20 L0 15 L5 10 Z M5 20 L10 25 L5 30 L0 25 L5 20 Z M5 30 L10 35 L5 40 L0 35 L5 30 Z' fill='%23b45309' fill-opacity='0.4' /%3E%3C/svg%3E\")",
              backgroundSize: "100% auto",
            }}></div>

          {/* Enhanced title with decorative elements */}
          {title && (
            <div className="text-center mt-[calc(2vw+1rem)] mb-[calc(1.5vw+0.75rem)]">
              <div className="relative inline-block">
                {/* Decorative elements before title */}
                <div className="absolute top-1/2  -left-[calc(3vw+1.5rem)] w-[calc(2.5vw+1.25rem)] h-[9px] bg-amber-700"></div>
                <div className="absolute top-1/2 mt-1 -left-[calc(2vw+1.9rem)]  w-[calc(1vw+0.5rem)] h-[calc(1vw+0.5rem)] border-2 border-amber-700 rounded-full transform -translate-y-1/2 flex items-center justify-center">
                  <div className="w-[calc(0.5vw+0.25rem)] h-[calc(0.5vw+0.25rem)] bg-emerald-700 rounded-full"></div>
                </div>

                {/* Title with enhanced styling */}
                <h2 className="inline-block px-[calc(1.5vw+0.75rem)] py-[calc(0.7vw+0.35rem)] text-[calc(1.5vw+1rem)] font-arabic font-bold text-amber-900 bg-gradient-to-r from-amber-100 to-amber-50 border-[calc(0.15vw+1px)] border-amber-700 rounded-full shadow-sm relative z-10">
                  <span className="relative inline-block">{title}</span>
                </h2>

                {/* Decorative elements after title */}
                <div className="absolute top-1/2 -right-[calc(3vw+1.5rem)] w-[calc(2.5vw+1.25rem)] h-[9px] bg-amber-700"></div>
                <div className="absolute top-1/2 mt-1 -right-[calc(2vw+1.9rem)] w-[calc(1vw+0.5rem)] h-[calc(1vw+0.5rem)] border-2 border-amber-700 rounded-full transform -translate-y-1/2 flex items-center justify-center">
                  <div className="w-[calc(0.5vw+0.25rem)] h-[calc(0.5vw+0.25rem)] bg-emerald-700 rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          {/* Islamic medallion decoration - responsive size using calc */}
          <div className="absolute -bottom-[calc(1vw+2.6rem)] left-1/2 transform -translate-x-1/2 w-[calc(2.5vw+1rem)] h-[calc(2.5vw+1rem)] bg-amber-700 rounded-full flex items-center justify-center">
            <div className="w-[calc(1.8vw+0.75rem)] h-[calc(1.8vw+0.75rem)] bg-emerald-700 rounded-full flex items-center justify-center">
              <div className="w-[calc(1.2vw+0.5rem)] h-[calc(1.2vw+0.5rem)] bg-amber-100 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IslamicBox;
