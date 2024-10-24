import React from "react";
import { markDownButtonsNameList } from "./utilities/constants";

const MarkdownButtons = ({showButton,setShowButton}:{showButton:string,setShowButton:React.Dispatch<React.SetStateAction<string>>}) => {

    function updateButton(item:string){
        setShowButton(item)  
    }
  return (
    <div className="h-12  flex items-center  border-b-2  px-3">
      {markDownButtonsNameList.map((item) => (
        <button className={`mr-1 flex space-x-1  rounded-md p-1`} onClick={()=>updateButton(item.identifier)}>
            <div className={`flex ${item.identifier === showButton ? "bg-slate-700 rounded-lg p-[2px]" : ""}`}>
          <img
            width="24"
            height="14"
            src={item.imgUrl}
            alt={item.name}
          />
          <span className="mx-2">{item.name}</span>
          </div>
          <span>|</span>
        </button>
      ))}
    </div>
  );
};

export default MarkdownButtons;
