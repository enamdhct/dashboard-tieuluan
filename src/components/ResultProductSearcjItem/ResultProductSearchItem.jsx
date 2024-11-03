import React from 'react'

export default function ResultProductSearchItem({fnAddBuild, type, item}) {
  return (
    <div onClick={()=>fnAddBuild(item, type)}>
        <div className='flex flex-row gap-2'>
            <div>
                <img src={item.imgURL} alt="" width={70} height={70}/>
            </div>
            <div className='flex flex-col gap-2'>
                <span className='font-bold text-lg'>{item.name}</span>
                <span className='font-bold text-red-500'>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
            </div>
        </div>
    </div>
  )
}
