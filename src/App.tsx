import { useDispatch, useSelector } from "react-redux";
import Problem from "./pages/Problem";
import { AppDispatch } from "./store/store";
import { useEffect } from "react";
import { fetchUsers } from "./store/slices/problem.slice";
import TierLimitExceeded from "./components/ui/AWSError";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsers())
  }, []);
  const problem= useSelector((store: any) => store?.allProblems)
  console.log(problem)

  if(!problem.loading && problem.error ){
    return <TierLimitExceeded/>
  }
  return (
    <h1>
      <Problem />

    </h1>
  );
}
