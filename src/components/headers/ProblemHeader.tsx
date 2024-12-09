import { useRef } from "react";
import ProblemList from "../ProblemList";
import { Pencil, Target } from "lucide-react";

const ProblemHeader = () => {
  const drawerCheckboxRef = useRef<HTMLInputElement>(null);
  const closeDrawer = () => {
    if (drawerCheckboxRef.current) {
      drawerCheckboxRef.current.checked = false;
    }
  };
  return (
    <div className="w-full h-16  box-border ">
      <div className="navbar bg-base-100 border   border-b-2">
        <div className="navbar-start">
          <div className="dropdown">
            <div className="drawer">
              <input
                ref={drawerCheckboxRef}
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                <label
                  htmlFor="my-drawer"
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </label>
              </div>
              <div className="drawer-side z-50">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ProblemList closeDrawer={closeDrawer} />
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-center">
          <img
            className="h-9 w-12"
            src="https://img.icons8.com/nolan/64/code--v2.png"
            alt=""
          />
          <a className="btn btn-ghost text-2xl">AlgoCode</a>
        </div>
        <div className="navbar-end">
          <div className="flex items-center">
            <button tabIndex={0}
            onClick={() => {
              window.open(import.meta.env.VITE_ADMIN_URL, "_blank");
            }}
            role="button" className=" text-l text-white hover:text-gray-300 font-semibold  bg-[#9125C1] rounded-md p-1 ">
              Admin
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemHeader;
