import React from "react";
import HighLightText from "./HighLightText";
import Button from "./Button";
import CTAButton from "../HomePage/Button";
import { TypeAnimation } from "react-type-animation";

function CodeBlock({postion, head, subHeading, btn1, btn2, codeBlock, codeColor , gradiant}) {
  const text = btn1;
  return (
    <div className={`flex flex-col ${postion} justify-center w-11/12 max-w-maxContent gap-[6.2rem] py-[5.62rem] font-inter`}>
      <div className="flex flex-col gap-3 lg:w-[40%] sm:full">
        <div className="w-full text-4xl font-semibold tracking-tight text-richblack-5">
          {head.first} <HighLightText text={head.highlighted} /> {head.last}
        </div>
        <p className="text-base font-medium text-richblack-300 pr-14">{subHeading}</p>
        <div className="flex flex-start gap-6 pt-12">
          <CTAButton
            text={btn1.text}
            active={true}
            linkTo={btn1.link}
            showArrow={true}
          ></CTAButton>
          <Button text={btn2.text} active={false} linkTo={btn1.link} />
        </div>
      </div>
      <div className=" h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative lg:w-[43%] sm:w-full border border-richblack-400 border-solid-[1px]">
        <div className={`bgGradiant ${gradiant} -left-8 -top-6`}></div>
        {/* Indexing */}
        <div className="text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        {/* Codes */}
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}
        >
          <TypeAnimation
            sequence={[codeBlock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
}

export default CodeBlock;
