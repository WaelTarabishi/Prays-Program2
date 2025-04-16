import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Hadith = () => {
  const [currentHadith, setCurrentHadith] = useState<number>(0);
  //@ts-ignore
  const [isChanging, setIsChanging] = useState<boolean>(false);

  // Collection of hadiths with their narrators
  const hadiths = [
    {
      text: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى، فمن كانت هجرته إلى الله ورسوله فهجرته إلى الله ورسوله، ومن كانت هجرته لدنيا يصيبها أو امرأة ينكحها فهجرته إلى ما هاجر إليه",
      narrator: "متفق عليه",
    },
    {
      text: "من سلك طريقا يلتمس فيه علما سهل الله له به طريقا إلى الجنة",
      narrator: "رواه مسلم",
    },
    {
      text: "المسلم من سلم المسلمون من لسانه ويده، والمهاجر من هجر ما نهى الله عنه",
      narrator: "رواه البخاري",
    },
    {
      text: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه",
      narrator: "متفق عليه",
    },
    {
      text: "من كان يؤمن بالله واليوم الآخر فليقل خيرا أو ليصمت، ومن كان يؤمن بالله واليوم الآخر فليكرم جاره، ومن كان يؤمن بالله واليوم الآخر فليكرم ضيفه",
      narrator: "متفق عليه",
    },
    {
      text: "الطهور شطر الإيمان، والحمد لله تملأ الميزان، وسبحان الله والحمد لله تملآن -أو تملأ- ما بين السماوات والأرض",
      narrator: "رواه مسلم",
    },
    {
      text: "اتق الله حيثما كنت، وأتبع السيئة الحسنة تمحها، وخالق الناس بخلق حسن",
      narrator: "رواه الترمذي",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentHadith((prev) => (prev + 1) % hadiths.length);
        setIsChanging(false);
      }, 500); // Wait for fade-out animation to complete
    }, 15000); // Change hadith every 6 seconds (increased from 4s to give more reading time)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex md:flex-row flex-col justify-center items-center md:gap-10   px-[calc(1vw)] ">
      <motion.img
        src="./star.png"
        className="md:w-[calc(9vw)] md:h-[calc(9vw)] w-[calc(7vw+4rem)] h-[calc(7vw+4rem)] "
        // animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative flex justify-center    bg-gradient-to-br from-amber-50 to-amber-100/90 border-[calc(0.2vw+1px)] border-amber-600/80 rounded-lg shadow-lg overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHadith}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="hadith-content min-w-[calc(20vw)] md:px-[calc(1vw)] px-[calc(1vw+0.2rem)] py-4"
            dir="rtl">
            <motion.p
              className="md:text-[calc(1vw+2rem)] text-[calc(3vw+0.1rem)] text-amber-800 mb-4 leading-relaxed font-arabic text-center"
              layout>
              {hadiths[currentHadith].text}
            </motion.p>
            <motion.p
              className="md:text-[calc(0.8vw+0.9rem)] text-[calc(0.8vw+0.3rem)] text-amber-600 text-left pl-[calc(0.2vw)]"
              layout>
              {hadiths[currentHadith].narrator}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.img
        src="./star.png"
        className="md:w-[calc(9vw)] md:h-[calc(9vw)] w-[calc(7vw+4rem)] h-[calc(7vw+4rem)]"
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Hadith;
