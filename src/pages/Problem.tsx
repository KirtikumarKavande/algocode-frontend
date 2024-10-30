import React, { useState, useEffect, useRef } from "react";
import ProblemHeader from "../components/headers/ProblemHeader";
import Editor from "../components/Editor";
import SelectBox from "../components/SelectBox";
import { programmingLanguage } from "../utilities/constansts";
import ReactMarkDown from "../components/MyMarkDown";
import ButtonList from "./ButtonList";
import { leftPanelBtnList, rightPannelButtonList } from "./utilities/constants";
import socket from "../components/socket/socket";
const Problem = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(50);
  const dividerRef = useRef<HTMLDivElement>(null);
  const [showLeftPanelBtn, setShowLeftPanelBtn] = useState("desc");
  const [showRightPanelBtn, setShowRightPanelBtn] = useState("code");
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

  function handleSubmitSubmission(){
    socket.emit("send_message", { message: "kirtikumar" });
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
          <div className="border-b">
            <ButtonList
              showButton={showLeftPanelBtn}
              setShowButton={setShowLeftPanelBtn}
              btnArray={leftPanelBtnList}
            />
          </div>

          <div className="  px-2">
            {showLeftPanelBtn === "desc" && <ReactMarkDown />}
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
            <div className="flex justify-between w-full items-center">
              <div>
                <ButtonList
                  showButton={showRightPanelBtn}
                  setShowButton={setShowRightPanelBtn}
                  btnArray={rightPannelButtonList}
                />
              </div>
              <div className="pr-4">
                <button className="p-1 bg-green-500 text-white text-bold rounded" onClick={handleSubmitSubmission}>Submit</button>
              </div>
            </div>
          </div>

          <div>
            {showRightPanelBtn === "code" && (
              <Editor selectedLang={selectedLang} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem;
