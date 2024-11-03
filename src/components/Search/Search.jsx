import React from 'react'
import Icon from '../Icon/Icon'

export default function Search({fnSearch, fnChange, fnClickSearch}) {
  return (
    <div className='flex flex-row items-center border-2 bg-white rounded px-2'>
        <input placeholder='TÌM KIẾM SẢN PHẨM' className='rounded p-2' onKeyDown={(e)=>{fnSearch(e)}} onChange={(e)=>{fnChange(e)}} style={{outline: "none"}}></input>
        <div onClick={()=>{fnClickSearch()}} className='cursor-pointer'>
          <Icon name={'search'} className='w-6 h-6 font-bold text-green-400'></Icon>
        </div>
    </div>
  )
}
