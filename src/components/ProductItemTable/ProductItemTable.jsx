import React from 'react'

export default function ProductItemTable({product}) {
    console.log(product)
  return (
    <div className='flex flex-row p-4 justify-between'>
        <div className='flex flex-row items-center gap-4 w-2/6'>
            <div>
                <input type="checkbox" name="" id="" checked={check  === true} onChange={(e) => handleChangeCheckbox(e)}/>
            </div>
            <div>
                {product.imgURL &&             
                <img src={product.imgURL} width={100} height={100} alt='product image'></img>}
            </div>
            <div>
                <span>{product.name}</span>
            </div>
        </div>
        <div className='flex flex-row items-center justify-center w-1/6'>
            <span>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
        </div>
        <div className='flex flex-row items-center justify-center w-1/6'>
            <UpDown setValue={setValue} value={sl}></UpDown>
        </div>
        <div className='flex flex-row items-center justify-center w-1/6'>
            <span>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
        </div>
        <div className='flex flex-row items-center justify-center w-1/6 cursor-pointer'>
            <span>Xóa</span>
        </div>
    </div>
  )
}
