import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getSelectedProblemId } from "../store/slices/problem.slice";
import useGetSelectedProblem from "../hooks/useGetSelectedProblem";
interface Problem {
  _id: string;
  title: string;
  difficulty: string;
}

const ProblemList = ({ closeDrawer }: { closeDrawer: () => void }) => {
  const problems: any = useSelector(
    (store: RootState) => store.allProblems.problems
  );
  const problemLinks = problems?.data;
  const dispatch = useDispatch();
  const selectedProblemData = useGetSelectedProblem();
  console.log("problems", selectedProblemData);
  const difficultyChips: { [key: string]: string } = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  };

  function selectedProblem(id: string) {
    console.log("reached here");
    dispatch(getSelectedProblemId(id));
    closeDrawer();
  }
  return (
    <ul className=" menu p-4 w-[500px] min-h-full bg-gray-800 text-white space-y-2">
      {problemLinks &&
        problemLinks.map((problem: Problem, index:any) => (
          <li
            key={problem._id}
            className={` group border-b border-gray-200 hover:bg-gray-800 pb-2 transition-colors duration-300 ease-in-out ${
              problem?._id === selectedProblemData?._id
                ? "bg-gray-700 rounded-lg"
                : !selectedProblemData && index === 0
                ? "bg-gray-700 rounded-lg"
                : ""
            } `}
          >
            <button
              onClick={() => selectedProblem(problem._id)}
              className="flex justify-between items-center py-3 px-4 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <span className="font-medium text-base">
                  {problem.title.length > 40
                    ? `${problem.title.slice(0, 40)}...`
                    : problem.title}
                </span>
                <span
                  className={`
                px-2 py-0.5 rounded-full text-xs font-semibold
                ${difficultyChips[problem.difficulty]}
              `}
                >
                  {problem.difficulty}
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </li>
        ))}
    </ul>
  );
};

export default ProblemList;
