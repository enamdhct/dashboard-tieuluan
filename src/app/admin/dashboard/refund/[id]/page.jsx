'use client'
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { getOrder } from '@/services/orderService';
import TitleTab from '@/components/TitleTab/TitleTab';
import OrderItem from '@/components/OrderItem/OrderItem';
import { getRequest, updateRefund } from '@/services/refundService';
import { alertSuccess } from '@/components/Swal/alert';


const steps = [
  'Chờ duyệt đơn hàng',
  'Đang Xử lý',
  'Hoàn thành',
];

export default function page({ params }) {
  const [order, setOrder] = useState('')
  const [request, setRequest] = useState('')

  const [orderStatus, setOrderStatus] = useState('')


  useEffect(() => {
    if (params) {
      getData()
    }
  }, [params])



  function getStateClass(state) {
    switch (state) {
      case 'Chờ duyệt':
        return 0;
      case 'Đang xử lý':
        return 1;
      case 'Hoàn thành':
        return 2;
      case 'Từ chối':
        return 3;
    }
  }
  async function getData() {
    let orderInfo = await getRequest(params.id)
    setRequest(orderInfo)
    let state = getStateClass(orderInfo.status)
    setOrderStatus(state)
    setOrder(orderInfo.detailOrder)
    console.log(orderInfo);
  }

  const udpateRequest = async (status) => {
    try {
      const data = await updateRefund(request._id, JSON.stringify({  status }));

      console.log({data});
      
      if (data) {
        alertSuccess({ status: 'success', text: 'Thao tác thành công' })
      } else {
        alertSuccess({ status: 'success', text: 'Thao tác that bai' })
      }
      getData()
    } catch (err) {
      alertSuccess({ status: 'success', text: 'Thao tác that bai' })
      getData()

      console.log({ err });
    }
  }

  return (
    <div className="flex flex-col">
      <div className='p-8 h-[calc(100%-40px)]'>

        <TitleTab text={'Thông tin yeu cau'} className={'text-black'}></TitleTab>
        <div className="flex gap-3 mt-3">
          <img className='flex-1 w-[50%]' src={request?.image} alt="" />
          <div className="flex flex-1 flex-col gap-3">
            <p className='text-xl flex-1 text-red-500 font-semi-bold'>{request?.reason}</p>
            {orderStatus <  2 ? <button onClick={() => udpateRequest(orderStatus == 0 ? "Đang xử lý" : "Hoàn thành")} className={`${orderStatus == 0 ? 'text-yellow-200' : 'text-red-200'} ${orderStatus == 0 ? 'bg-yellow-600' : 'bg-red-600'} py-3 hover:scale-105 transition-all`}>{orderStatus == 0 ? "Duyệt" : "Hoàn thành"}</button> : <span className='bg-green-300 text-center py-3 text-green-500 font-bold'>Hoan thanh</span>}
          </div>
        </div>
      </div>
      <div className='p-8 h-[calc(100%-40px)]'>
        <TitleTab text={'Thông tin đơn hàng'} className={'text-black'}></TitleTab>
        <div>
          <div className="mt-4 bg-white p-5 rounded-lg shadow-inner" style={{ minHeight: "87%" }}>

            <div className='py-5 mb-4'>
              <span className='text-xl font-bold'>Tình trạng đơn hàng</span>
            </div>
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={orderStatus} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            <hr className='my-8' />

            <div>
              <span className='text-xl font-bold'>Thông tin đơn hàng</span>
            </div>
            <OrderItem data={order} refreshData={getData}></OrderItem>
          </div>
        </div>

      </div>
    </div>

  )
}
