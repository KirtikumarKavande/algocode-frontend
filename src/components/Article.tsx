import DOMPurify from 'dompurify'
import useGetSelectedProblem from '../hooks/useGetSelectedProblem';

const Article = () => {
   const problem=useGetSelectedProblem()
   const articleData = DOMPurify.sanitize(problem && problem.article);
 
  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
    <div className="max-w-4xl mx-auto">
      {/* Problem Header */}
      <div className="flex justify-between items-center mb-4">
        <div className='flex justify-center  items-center h-12 w-[50%]'>
          <h1 className="text-3xl font-bold text-white mr-5">
             {problem && problem.title}
          </h1>
            <div 
              className={`
                px-3 py-1 rounded-full text-sm font-semibold
                ${problem.difficulty === 'Easy' 
                  ? 'bg-green-600/20 text-green-400' 
                  : problem.difficulty === 'Medium' 
                  ? 'bg-yellow-600/20 text-yellow-400' 
                  : 'bg-red-600/20 text-red-400'}
              `}
            >
              {problem.difficulty}
            </div>
            
        </div>
        <div className="flex items-center space-x-4">
        
       
        </div>
      </div>

   

      {/* Content Area */}
      <div className="bg-gray-800 rounded-lg p-6">
          <div className="prose prose-invert max-w-none">
            {/* Render markdown-like content */}
            <div 
              dangerouslySetInnerHTML={{ 
                __html: articleData
                  .replace(/^# (.+)$/gm, '<h1>$1</h1>')
                  .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                  .replace(/`([^`]+)`/g, '<code>$1</code>')
                  .replace(/\n/g, '<br/>')
              }} 
            />
          </div>

        
      </div>
    </div>
  </div>
  )
}

export default Article