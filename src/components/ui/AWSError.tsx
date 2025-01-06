import { Hourglass, Link, Stars } from 'lucide-react';

export default function TierLimitExceeded() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-6">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated illustration */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          {/* Rotating stars background */}
          <div className="absolute inset-0 animate-spin-slow">
            <Stars className="w-full h-full text-purple-200" />
          </div>
          
          {/* Bouncing hourglass */}
          <div className="absolute inset-0 flex items-center justify-center animate-bounce">
            <Hourglass className="w-20 h-20 text-purple-500" />
          </div>
          
          {/* Pulsing circle */}
          <div className="absolute inset-0 bg-purple-100 rounded-full opacity-30 animate-pulse"></div>
        </div>
        
        {/* Main message */}
        <h1 className="text-3xl font-bold text-purple-600 mb-4 animate-pulse">
          Oops! AWS Free Tier Limit Exceeded
        </h1>
        
        {/* Explanation */}
        <div className="space-y-4 mb-8">
         
        <p className="text-gray-600 text-lg">
          Please explore architecture and code here
           &nbsp;
           <a className='inline' href="https://docs.google.com/document/d/1Oe_KT7nVc2cetig29c0rsDjf9Rt9AMei7fSYrDAJwgM/edit?tab=t.0" ><Link className='inline' size={20}/></a>
          </p>
          <p className="text-purple-500 font-medium animate-pulse">
            Stay tuned - We'll be back soon!
          </p>
        </div>
        
        
      </div>
    </div>
  );
}