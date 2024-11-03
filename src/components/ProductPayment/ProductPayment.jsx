import React from 'react'

export default function ProductPayment({productCart}) {
  return (
    <div className='flex flex-row mt-4 justify-between'>
        <div className='flex flex-row items-center gap-4 w-3/6'>
            {/* <div>
                {product.imgURL &&             
                <img src={product.imgURL} width={100} height={100} alt='product image'></img>}
            </div> */}
            <img src={productCart.imgProduct} width={100} height={100} alt="" />
            <div>
                <span>{productCart.name}</span>
            </div>
        </div>
        <div className='flex flex-row items-center justify-center w-1/6'>
            <span>{productCart.price.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span>
        </div>
        <div className='flex flex-row items-center justify-center w-1/6'>
            <span>{productCart.quantity}</span>
        </div>
        <div className='flex flex-row items-center justify-center w-1/6'>
            <span>{productCart.totalPrice.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</span>
        </div>
    </div>
  )
}
