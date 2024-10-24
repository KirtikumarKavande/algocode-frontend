import React, { useState, useEffect, useRef } from "react";
import ProblemHeader from "../components/headers/ProblemHeader";
import Editor from "../components/Editor";
import SelectBox from "../components/SelectBox";
import { programmingLanguage } from "../utilities/constansts";
import ReactMarkDown from "../components/MyMarkDown";
const Problem = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(50);
  const dividerRef = useRef<HTMLDivElement>(null);
  const [selectedLang, setSelectedLang] = useState("c_cpp");
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      const mouseX = event.clientX;
      const viewportWidth = window.innerWidth;
      const mouseXPercentage = (mouseX / viewportWidth) * 100;
      console.log(mouseXPercentage);
      if (mouseXPercentage < 10 && mouseXPercentage > 90) {
        return;
      }
      setCurrentWidth(mouseXPercentage);
    };

    const handleMouseUp = () => {
      if (dividerRef.current) {
        dividerRef.current.classList.remove("bg-blue-700");
      }

      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  function mouseDown() {
    setIsDragging(true);
    if (dividerRef.current) {
      dividerRef.current.classList.add("bg-blue-700");
    }
  }
  function handleChangeLanguagesOption(lang: string) {
    setSelectedLang(lang);
  }
  return (
    <div>
      <ProblemHeader />
      <div className="w-full flex p-1 overflow-hidden">
        <div
          style={{ width: `${currentWidth}%`,height:"100vh", overflow:"scroll" }}
          className="border rounded max-w-full overflow-auto px-2"
        >
          <ReactMarkDown/>
        </div>
        <div
          ref={dividerRef}
          className="divider w-1 h-[95vh]  bg-white cursor-ew-resize flex justify-center"
          onMouseDown={mouseDown}
        />

        <div
          style={{ width: `${100 - currentWidth}%`,height:"100vh" }}
          className="border rounded"
        >
          <div className="h-14 border-b-2  border-gray-700">
            <div className="p-1">
              <SelectBox
                programmingLanguage={programmingLanguage}
                handleChangeLanguagesOption={handleChangeLanguagesOption}
              />
            </div>
          </div>

          <Editor selectedLang={selectedLang} />
        </div>
      </div>
    </div>
  );
};

export default Problem;
