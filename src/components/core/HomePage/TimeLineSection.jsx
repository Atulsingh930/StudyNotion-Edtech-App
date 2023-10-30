import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimeLine from "../../../assets/Images/TimelineImage.png"

function TimeLineSection() {
  const timelines = [
    {
      logo: Logo1,
      heading: "Leadership",
      subheading: "Fully committed to the success company",
    },
    {
      logo: Logo2,
      heading: "Responsibility",
      subheading: "Students will always be our top priority",
    },
    {
      logo: Logo3,
      heading: "Flexibility",
      subheading: "The ability to switch is an important skills",
    },
    {
      logo: Logo4,
      heading: "Solve the problem",
      subheading: "Code your way to a solution",
    },
  ];
  return (
    // main div
    <div className="w-11/12 max-w-maxContent flex justify-between mb-20 gap-16 mx-auto">
      {/* four content div */}
      <div className="flex flex-col gap-8"> 
        {/* single content div */}
        {timelines.map((timeline) => (
          <div className="flex px-3 py-4 gap-6 items-center">
            {/* badge content div */}
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-white shadow-[0px_0px_62px_0px_rgba(0_0_0_0.12)]">
              <img src={timeline.logo} alt="" />
            </div>
            {/* content content div */}
            <div className="flex flex-col items-start gap-0.5">
              <p className="text-lg font-semibold">{timeline.heading}</p>
              <p className="text-sm">{timeline.subheading}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="relative z-0 h-[34.0625rem] font-inter">
        <div className="absolute z-50 flex p-10 bg-caribbeangreen-300m gap-12 bg-caribbeangreen-700 -bottom-12 left-[15%]">
            <div className="flex gap-6 items-center text-white">
                <p className="text-4xl font-bold leading-tight">10</p>
                <p className="text-sm font-medium text-caribbeangreen-300">YEARS <br /> EXPERIENCES</p>
            </div>
            <div className="w-[0.0625rem] h-9 bg-caribbeangreen-500"></div>
            <div className="flex gap-6 items-center text-white">
                <p className="text-4xl font-bold leading-tight">250</p>
                <p className="text-sm font-medium text-caribbeangreen-300">TYPES OF <br /> COURSES</p>
            </div>
        </div>
        <div className="timeLine_gradiant z-10"></div>
        <div className="relative h-full z-20 shadow-[20px_20px_0px_0px_#FFF]">
            <img  src={TimeLine} alt="" />
        </div>
      </div>
    </div>
  );
}

export default TimeLineSection;
