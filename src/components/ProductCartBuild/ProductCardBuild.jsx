import React from 'react'

export default function ProductCardBuild({product, setStateFn, type, openFn}) {
  return (
    <div className='flex flex-row gap-2'>
        <div>
            <img src={product.imgProduct} alt="" width={70} height={70}/>
        </div>
        <div className='flex flex-row gap-2'>
            <div className='flex flex-col gap-2'>
                <span className='font-bold text-lg'>{product.name}</span>
                <span className='font-bold text-red-500'>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
            </div>
            {
                setStateFn && <button onClick={()=>setStateFn("")} className='font-bold text-lg text-red-600'>X</button>
            }

        </div>
    </div>
  )
}
