import React, { useState, useEffect, useRef } from "react";
import ProblemHeader from "../components/headers/ProblemHeader";
import Editor from "../components/Editor";
import SelectBox from "../components/SelectBox";
import { programmingLanguage } from "../utilities/constansts";
import ReactMarkDown from "../components/MyMarkDown";
import MarkdownButtons from "./MarkdownButtons";
const Problem = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(50);
  const dividerRef = useRef<HTMLDivElement>(null);
  const [showButton,setShowButton] = useState("desc")
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
      <div className="w-full flex overflow-hidden p-1">
        <div
          style={{
            width: `${currentWidth}%`,
            height: "100vh",
            overflow: "scroll",
          }}
          className="border rounded max-w-full overflow-auto "
        >
         <MarkdownButtons showButton={showButton} setShowButton={setShowButton}/>

         
          <div className="  px-2">
          {
            showButton === "desc" && <ReactMarkDown />
          }
          </div>
        </div>
        <div
          ref={dividerRef}
          className="divider w-1 h-[95vh]  bg-white cursor-ew-resize flex justify-center"
          onMouseDown={mouseDown}
        />

        <div
          style={{ width: `${100 - currentWidth}%`, height: "100vh" }}
          className="border rounded"
        >
          <div className="h-12 border-b-2  border-gray-700 flex items-center">
            <div className="px-3 ">
              <SelectBox
                programmingLanguage={programmingLanguage}
                handleChangeLanguagesOption={handleChangeLanguagesOption}
              />
            </div>
            <div className="text-3xl self-start">|</div>
            <div>
              
            </div>
          </div>


          <Editor selectedLang={selectedLang} />
        </div>
      </div>
    </div>
  );
};

export default Problem;
