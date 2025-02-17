import { useState, useEffect, useRef } from "react";
import ProblemHeader from "../components/headers/ProblemHeader";
import Editor from "../components/Editor";
import SelectBox from "../components/SelectBox";
import { programmingLanguage } from "../utilities/constansts";
import ReactMarkDown from "../components/MyMarkDown";
import ButtonList from "./ButtonList";
import { leftPanelBtnList, rightPannelButtonList } from "./utilities/constants";
import socket from "../components/socket/socket";
import axios from "axios";
import Article from "../components/Article";
import Solutions from "../components/Solutions";
import { Loader2, RotateCcw } from "lucide-react";
import useGetSelectedProblem from "../hooks/useGetSelectedProblem";
import { db } from "../indexDb/problem-solution.db";
import Result from "../components/Result";
import { toast } from "react-toastify";
const Problem = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(50);
  const dividerRef = useRef<HTMLDivElement>(null);
  const [showLeftPanelBtn, setShowLeftPanelBtn] = useState("desc");
  const [showRightPanelBtn, setShowRightPanelBtn] = useState("code");
  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem("selectedLang") || "javascript"
  );
  const [code, setCode] = useState("");
  const [testCaseResult, setTestCaseResult] = useState({});
  const [isClickedOnSubmit, setIsClickedOnSubmit] = useState(false);
  const resetTextHover = useRef<HTMLDivElement>(null);
  const problemData = useGetSelectedProblem();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    function testCaseResult(value: object) {
      setIsClickedOnSubmit(false);
      setTestCaseResult(value);
    }

    socket.on("payload", testCaseResult);

    return () => {
      socket.off("payload", testCaseResult);
    };
  }, []);
  useEffect(() => {
    setTestCaseResult({});
    setShowRightPanelBtn("code");
  }, [problemData?._id]);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;
      if (dividerRef.current) {
        dividerRef.current.classList.remove("bg-white");
        dividerRef.current.classList.add("bg-blue-400");
      }

      const mouseX = event.clientX;
      const viewportWidth = window.innerWidth;
      const mouseXPercentage = (mouseX / viewportWidth) * 100;
      if (mouseXPercentage < 10 && mouseXPercentage > 90) {
        return;
      }
      setCurrentWidth(mouseXPercentage);
    };

    const handleMouseUp = () => {
      if (dividerRef.current) {
        dividerRef.current.classList.add("bg-white");

        dividerRef.current.classList.remove("bg-blue-400");
      }

      setIsDragging(false);
    };

    if (isDragging) {
      document.body.style.userSelect = "none";
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
  }

  function mouseUp() {
    setIsDragging(false);
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
      if (selectedLang != "javascript") {
        toast.error("Apologies! Currently, we only support JavaScript.");
        return;
      }
      setIsClickedOnSubmit(true);
      setShowRightPanelBtn("result");
      const response = await axios.post(
        `${
          import.meta.env.VITE_SUBMISSION_SERVICE_URL
        }/v1/submissions/addsubmissions`,
        {
          code,
          language: selectedLang,
          userId: "1",
          problemId: problemData?._id,
        }
      );
    
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  return (
    <div>
      <ProblemHeader />
      <div className="w-full flex flex-col lg:flex-row overflow-hidden p-1 ">
        <div
          style={{
            width: windowWidth >= 1024 ? `${currentWidth}%` : "100%",
            height: "calc(100vh - 70px)",
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
          {!problemData ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] space-y-4 ">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <p
                className="text-lg text-gray-600 animate-pulse"
                id="loadingText"
              >
                Getting Problem For You...
              </p>
            </div>
          ) : (
            <div>
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
          )}
        </div>
        <div
          ref={dividerRef}
          className="divider hidden lg:block w-1 h-[85vh]  bg-white cursor-ew-resize  justify-center"
          onMouseDown={mouseDown}
          onMouseUp={mouseUp}
        />

        <div
          style={{
            width: windowWidth >= 1024 ? `${100 - currentWidth}%` : "100%",
            height: "calc(100vh - 70px)",
            overflowY: "scroll",
          }}
          className="border rounded"
        >
          <div className="h-12 border-b-2  border-gray-700 flex items-center">
            <div className=" px-1 md:px-3 ">
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

              <div className="pr-2 md:pr-4 flex items-center space-x-3 relative">
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
                  className="absolute p-1 px-1 md:px-2 rounded-lg bg-gray-500 top-9 z-50 right-8 w-max"
                >
                  Reset to Original
                </div>
                <button
                  className="p-1 bg-[#1E6BFF] text-white text-bold rounded"
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
            {showRightPanelBtn === "result" && (
              <Result
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
