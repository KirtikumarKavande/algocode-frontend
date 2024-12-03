import { useSelector } from 'react-redux';

const useGetSelectedProblem = () => {
    const storeData: any = useSelector((store: any) => store?.allProblems);
    const selectedId = storeData?.selectedProblemId;
    const problemData = storeData?.problems?.data;
    let problem = problemData &&problemData?.find((problem: any) => problem._id === selectedId);
    if (!problem) {
      problem =problemData && problemData[0];
    }
  return problem
}

export default useGetSelectedProblem