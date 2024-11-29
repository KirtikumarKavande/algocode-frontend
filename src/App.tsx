import { useDispatch } from "react-redux";
import Problem from "./pages/Problem";
import { AppDispatch } from "./store/store";
import { useEffect } from "react";
import { fetchUsers } from "./store/slices/problem.slice";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsers())
  }, []);
  return (
    <h1>
      <Problem />
    </h1>
  );
}
