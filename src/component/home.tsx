import { useState } from "react";
import "../App.css";
import Dates from "./dates";
import Footer from "./footer";
import Hadith from "./hadith";
import Header from "./header";
import PrayerTimes from "./prays-time";
import ReaminingTime from "./reamining-time";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Home() {
  const handleRemainingTime = (value: number) => {
    setRemainingTime(value);
  };

  const token = Cookies.get("prayerTimeIdlebTimeAdminToken");
  const navigate = useNavigate();
  console.log(token);
  if (!token) {
    navigate("/login");
  }
  const [remainingTime, setRemainingTime] = useState<number>(0);
  return (
    <div className="min-h-screen bg-amber-100/50 select-none pointer-events-none px-[calc(2vw+1rem)] ">
      <div className="pt-[calc(1vw+1rem)] flex flex-col gap-y-[calc(1vw+1rem)]">
        <Header />
        <Dates />
        <PrayerTimes onNumberChange={handleRemainingTime} />
        <ReaminingTime remainingTime={remainingTime} />
      </div>
      <Hadith />
      <Footer />
    </div>
  );
}

export default Home;
