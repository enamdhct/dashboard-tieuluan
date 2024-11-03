import React from 'react'

export default function TitleTab({text, className}) {
  return (
    <div className='bg-white p-5 rounded-lg shadow-inner'>
      <div className='text-white text-2xl font-bold'>
        <h1 className={className}>{text}</h1>
      </div>
    </div>
  )
}
