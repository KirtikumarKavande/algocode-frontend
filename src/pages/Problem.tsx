import React, { useState, useEffect, useRef } from "react";
import ProblemHeader from "../components/headers/ProblemHeader";

const Problem = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(50);
  const dividerRef = useRef<HTMLDivElement>(null);
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
        dividerRef.current.classList.remove("bg-blue-500");
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
  console.log(currentWidth);

  function mouseDown() {
    setIsDragging(true);
    if (dividerRef.current) {
      dividerRef.current.classList.add("bg-blue-500");
    }
  }
  return (
    <div>
      <ProblemHeader />
      <div className="w-full flex p-1 overflow-hidden">
        <div
          style={{ width: `${currentWidth}%` }}
          className="border rounded max-w-full overflow-auto"
        >
          problem
        </div>
        <div
          ref={dividerRef}
          className="divider w-1 min-h-screen bg-white cursor-ew-resize"
          onMouseDown={mouseDown}
        />

        <div
          style={{ width: `${100 - currentWidth}%` }}
          className="border rounded"
        >
          editor
        </div>
      </div>
    </div>
  );
};

export default Problem;
