import React from "react";

const ButtonList = ({
  showButton,
  setShowButton,
  btnArray,
}: {
  showButton: string;
  setShowButton: React.Dispatch<React.SetStateAction<string>>;
  btnArray: { name: string; imgUrl: string; identifier: string }[];
}) => {
  function updateButton(item: string) {
    setShowButton(item);
  }
  return (
    <div className="h-12  flex items-center px-0  md:px-3">
      {btnArray.map((item) => (
        <button
          className={`mr-1 flex space-x-1  rounded-md p-1`}
          onClick={() => updateButton(item.identifier)}
        >
          <div
            className={`flex ${
              item.identifier === showButton
                ? "bg-slate-700 rounded-lg px-[2px] py-[3px]"
                : ""
            }`}
          >
            <img width="24" height="10" src={item.imgUrl} alt={item.name} />
            <span className="mx-2">{item.name}</span>
          </div>
          <span>|</span>
        </button>
      ))}
    </div>
  );
};

export default ButtonList;
