'use client'
import React, {useState, useEffect} from 'react'
import ProductPayment from '../ProductPayment/ProductPayment'
import { updateOrder, deleteOrder } from '@/services/orderService';
import { confirmDelete } from '../Swal/alert';
import Link from 'next/link';
import Icon from '@/assets/icon/icon';
import { getLocation } from '@/services/locationService';
const moment = require('moment');

export default function OrderItem({data, refreshData, openReview}) {
    const [location, setLocation] = useState('')
    console.log(data);

    useEffect(()=>{
        if (data){
          getLocationInfo()
        }
      }, [data])

    function getStateClass(state) {
        switch (state) {
          case 'Đang xử lí':
            return 'text-yellow-500 font-bold text-lg';
          case 'Đang vận chuyển':
            return 'text-sky-500 font-bold text-lg';
          case 'Hoàn thành':
            return 'text-green-500 font-bold text-lg';
         case 'Đã hủy':
            return 'text-red-500 font-bold text-lg';
        case 'Nháp':
            return 'text-slate-400 font-bold text-lg';
        }
      }
      async function getLocationInfo (){
        let location = await getLocation(data.shippingAddress)
        console.log(location);
        setLocation(location)
      }

  return (
    <div className='p-8 h-[calc(100%-40px)]'>
        <div className='flex flex-row justify-between py-2'>
            <div className='flex flex-row'>
                <span>Đơn hàng:</span>
                <span className='ml-4 font-bold'>{data._id}</span>
            </div>
            <div className='flex flex-row text-y'>
                <span>Trạng thái:</span>
                <span className={`ml-4 ${getStateClass(data.state)}`}>{data.state}</span>
            </div>
        </div>
        <hr />
        <div>
            {data.product && data.product.map((item, index)=>{
                return(
                    <ProductPayment key={index} productCart={item}></ProductPayment>
                )
            })}
        </div>

        <hr className='mt-4'/>
        <div className='mt-4'>
                <div className='flex flex-col text-lg w-full gap-2'>
                    <div className='w-full flex'>
                        <span className='text-bold text-slate-500 w-1/6'>Thời gian đặt hàng: </span> <span className='text-bold w-5/6'>Vào lúc {moment(data.orderTime).format('DD-MM-YYYY hh:mm:ss')}</span>
                    </div>
                    <div className='w-full flex'>
                        <span className='text-bold text-slate-500 w-1/6'>Địa chỉ giao hàng: </span><span className='text-bold w-5/6'>{location.location}</span>
                    </div>
                </div>
            </div>
        <div>
            <div className='flex flex-col mt-4'>
                <div className='flex flex-row items-center justify-end'>
                    <div className='flex flex-row item-center'>
                        <div className='flex items-center'>
                            <Icon name={'money'} className='w-6 h-6 mr-3 text-red-600'></Icon>
                        </div>
                        <span className='text-red-600 font-bold text-lg'>Phí vận chuyển: </span>
                    </div>
                    <div className='ml-4'>
                        <span className='font-bold text-xl text-red-600'>{data.shippingFee && data.shippingFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-end'>
                    <div className='flex flex-row item-center'>
                        <div className='flex items-center'>
                            <Icon name={'money'} className='w-6 h-6 mr-3 text-red-600'></Icon>
                        </div>
                        <span className='text-red-600 font-bold text-xl'>Thành tiền: </span>
                    </div>
                    <div className='ml-4'>
                        <span className='font-bold text-xl text-red-600'>{data.Price && data.Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
