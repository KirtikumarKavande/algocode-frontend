import React, { useState, useEffect, useRef } from "react";
import ProblemHeader from "../components/headers/ProblemHeader";
import Editor from "../components/Editor";
import TestCase from "../components/TestCase";
import SelectBox from "../components/SelectBox";
import { programmingLanguage } from "../utilities/constansts";
import ReactMarkDown from "../components/MyMarkDown";
import ButtonList from "./ButtonList";
import { leftPanelBtnList, rightPannelButtonList } from "./utilities/constants";
import socket from "../components/socket/socket";
import axios from "axios";
import Article from "../components/Article";
import Solutions from "../components/Solutions";
import { RotateCcw } from "lucide-react";
import useGetSelectedProblem from "../hooks/useGetSelectedProblem";
import { db } from "../indexDb/problem-solution.db";
const Problem = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(50);
  const dividerRef = useRef<HTMLDivElement>(null);
  const [showLeftPanelBtn, setShowLeftPanelBtn] = useState("desc");
  const [showRightPanelBtn, setShowRightPanelBtn] = useState("code");
  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem("selectedLang") || "c_cpp"
  );
  const [code, setCode] = useState("");
  const [testCaseResult, setTestCaseResult] = useState({});
  const [isClickedOnSubmit, setIsClickedOnSubmit] = useState(false);
  const resetTextHover = useRef<HTMLDivElement>(null);
  const problemData = useGetSelectedProblem();

  useEffect(() => {
    function testCaseResult(value: object) {
      setIsClickedOnSubmit(false);
      setTestCaseResult(value);
      console.log("socket on frontend", value);
    }

    socket.on("payload", testCaseResult);

    return () => {
      socket.off("payload", testCaseResult);
    };
  }, []);

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
      dividerRef.current.style.setProperty("background-color", "blue");
    }
  }

  function handleChangeLanguagesOption(lang: string) {
    setSelectedLang(lang);
    localStorage.setItem("selectedLang", lang);
  }

  async function resetSolution() {
    const codeStub = problemData?.initialCodeStub;
    setCode(codeStub[selectedLang]);
    await db.userSolution.delete(problemData?._id);
  }
  function mouseEnterOnRestIcon() {
    if (resetTextHover.current) {
      resetTextHover.current.style.display = "block";
    }
  }
  function mouseLeaveOnRestIcon() {
    if (resetTextHover.current) {
      resetTextHover.current.style.display = "none";
    }
  }

  async function handleSubmitSubmission() {
    socket.emit("redis-cache", { userId: "1" });
    try {
      console.log(code);
      console.log(selectedLang);
      const response = await axios.post(
        "http://localhost:5000/api/v1/submissions/addsubmissions",
        {
          code,
          language: selectedLang,
          userId: "1",
          problemId: "661184c6a5f8943ad4d8c3c9",
        }
      );
      console.log(response);
      setIsClickedOnSubmit(true);
      setShowRightPanelBtn("testCase");
      return response;
    } catch (error) {
      console.log(error);
    }
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
          <div className="px-2">
            {showLeftPanelBtn === "article" && <Article />}
          </div>
          <div className="px-2">
            {showLeftPanelBtn === "solution" && <Solutions />}
          </div>
        </div>
        <div
          ref={dividerRef}
          className="divider w-1 h-[95vh]  bg-white cursor-ew-resize flex justify-center"
          onMouseDown={mouseDown}
        />

        <div
          style={{
            width: `${100 - currentWidth}%`,
            height: "100vh",
            overflowY: "scroll",
          }}
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
              <div className="pr-4 flex items-center space-x-3 relative">
                <RotateCcw
                  onMouseEnter={mouseEnterOnRestIcon}
                  onMouseLeave={mouseLeaveOnRestIcon}
                  size={20}
                  onClick={resetSolution}
                  className="cursor-pointer hover:text-gray-400 hover:rounded"
                />
                <div
                  ref={resetTextHover}
                  style={{ display: "none" }}
                  className="absolute p-1 px-2 rounded-lg bg-gray-500 top-9 z-50 right-8 w-max"
                >
                  Reset to Original
                </div>
                <button
                  className="p-1 bg-green-500 text-white text-bold rounded"
                  onClick={handleSubmitSubmission}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div>
            {showRightPanelBtn === "code" && (
              <Editor
                selectedLang={selectedLang}
                setCode={setCode}
                code={code}
              />
            )}
          </div>
          <div>
            {showRightPanelBtn === "testCase" && (
              <TestCase
                testCaseResult={testCaseResult}
                isClickedOnSubmit={isClickedOnSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem;
