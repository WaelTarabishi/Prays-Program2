import React from 'react';
import PrayerTimesDashboard from './prays-time';

const PrayerTimes: React.FC = () => {
  // Example data - in a real app, this would come from an API
  const prayerTimesData = {
    date: "Monday, January 15, 2024",
    hijriDate: "٤ رجب ١٤٤٥",
    prayerTimes: [
      { name: "Fajr", arabicName: "الفجر", time: "05:23 AM" },
      { name: "Sunrise", arabicName: "الشروق", time: "06:45 AM" },
      { name: "Dhuhr", arabicName: "الظهر", time: "12:30 PM", isNext: true },
      { name: "Asr", arabicName: "العصر", time: "03:45 PM" },
      { name: "Maghrib", arabicName: "المغرب", time: "06:15 PM" },
      { name: "Isha", arabicName: "العشاء", time: "07:45 PM" }
    ],
    hadith: {
      text: "من صلى البردين دخل الجنة",
      source: "صحيح البخاري ومسلم"
    }
  };

  return (
    <div className="min-h-screen bg-amber-50/50 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl text-center font-bold text-amber-900 mb-8">
          Prayer Times Dashboard
        </h1>
        {/* @ts-ignore */}
        <PrayerTimesDashboard {...prayerTimesData} />
      </div>
    </div>
  );
};

export default PrayerTimes;
