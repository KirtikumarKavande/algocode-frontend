import DOMPurify from 'dompurify'
import useGetSelectedProblem from '../hooks/useGetSelectedProblem';

const Article = () => {
   const problem=useGetSelectedProblem()
   const sanitizedContent = DOMPurify.sanitize(problem && problem.article);
 
  return (
    <div className='px-1 py-4'
      dangerouslySetInnerHTML={{ __html:sanitizedContent }}
    />
  )
}

export default Article