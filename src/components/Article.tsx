import DOMPurify from 'dompurify'
import useGetSelectedProblem from '../hooks/useGetSelectedProblem';
import { Newspaper } from 'lucide-react';

const Article = () => {
   const problem=useGetSelectedProblem()
   const articleData = DOMPurify.sanitize(problem && problem.article);
 
  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
    <div className="max-w-4xl mx-auto">
      {/* Problem Header */}
      <div className="flex justify-between items-center mb-4 h-12">
        <div className='flex justify-center  items-center  '>
          <h1 className="text-2xl font-bold flex items-center  text-white mr-5">
          <Newspaper size={25} className='mr-4' /> {problem && problem.title}
          </h1>
            <div 
              className={`
                px-3 py-[3px] rounded-full text-sm font-semibold
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