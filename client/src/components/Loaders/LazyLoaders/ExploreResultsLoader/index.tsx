import React from 'react'

const ExploreResultsLoader = () => {
  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2'>
      {[1, 2, 3, 4].map(c => (
        <div className='rounded-lg border border-gray-200 shadow-md p-4 skeleton' style={{height: '312px'}}>
          <div className="flex justify-center p-2 cursor-pointer relative">
            <div className="w-24 h-24 rounded-full skeleton shadow-lg" />
          </div>
          <div className="skeleton shadow-lg h-8 w-28 rounded mx-auto mb-2" />
          <div className="skeleton shadow-lg h-8 w-12 rounded mx-auto mb-2" />
          <div className="skeleton shadow-lg h-8 w-20 rounded mx-auto mb-4" />
        </div>
      ))}
    </div>
  )
}

export default ExploreResultsLoader