import React from "react";

interface PraysTimeTextProps {
  title?: string;
  time?: string;
}

const PraysTimeText: React.FC<PraysTimeTextProps> = ({
  title = "صلاة الفجر",
  time = "05:30",
}) => {
  return (
    <div className={"  "}>
      <div className={"frameContainer"}>
        <img src="/frame.png" alt="Prayer Frame" className={"frame"} />
        <div className={"textOverlay"}>
          <h3 className={"prayerTitle"}>{title}</h3>
          <p className={"prayerTime"}>{time}</p>
        </div>
      </div>
    </div>
  );
};

export default PraysTimeText;
