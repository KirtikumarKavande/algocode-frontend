import DOMPurify from 'dompurify'
import { useSelector } from 'react-redux'

const Article = () => {
    const storeData:any = useSelector((store: any)=>store?.allProblems)
    const selectedId=storeData?.selectedProblemId
    const problemData=storeData?.problems?.data
   let problem= problemData.find((problem: any) => problem._id === selectedId)
        if(!problem){
            problem=problemData[0]
        }
   const sanitizedContent = DOMPurify.sanitize(problem && problem.article);
 
  return (
    <div className='px-1 py-4'
      dangerouslySetInnerHTML={{ __html:sanitizedContent }}
    />
  )
}

export default Article