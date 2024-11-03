import React from 'react'

export default function ProductCardBuildOpen({type, openFn}) {
  return (
    <div className='w-full flex justify-center'>
        <div className='flex flex-row gap-2 cursor-pointer' onClick={()=>openFn(type)}>
            <div>
                <img src={"https://firebasestorage.googleapis.com/v0/b/argishop-cab9c.appspot.com/o/images%2Fpc.jpg?alt=media&token=09cc34e1-d1a4-4e7a-8a8e-bfb7ed4d1c73"} alt="" width={70} height={70}/>
            </div>
            <div className='flex flex-row gap-2'>
                <div className='flex flex-col gap-2'>
                    <span className='font-bold text-lg'>Không có sản phẩm</span>
                    <span className='font-bold text-red-500'>Bấm vào để chọn</span>
                </div>
            </div>
        </div>
    </div>
  )
}
