'use client'
import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { getOrder } from '@/services/orderService';
import TitleTab from '@/components/TitleTab/TitleTab';
import OrderItem from '@/components/OrderItem/OrderItem';


const steps = [
    'Đặt hàng thành công',
    'Xác nhận đơn hàng',
    'Vận chuyển',
    'Đơn hàng thành công',
  ];

export default function page({params}) {
    const [order, setOrder] = useState('')
    const [orderStatus, setOrderStatus] = useState('')


    useEffect(()=>{
        if (params){
            getData()
        }
    }, [params])



    function getStateClass(state) {
        switch (state) {
          case 'Đang xử lí':
            return 1;
          case 'Đang vận chuyển':
            return 3;
          case 'Hoàn thành':
            return 4;
         case 'Đã hủy':
            return 5;
        }
      }
    async function getData (){
        let orderInfo = await getOrder(params.id)
        let state = getStateClass(orderInfo.state)
        setOrderStatus(state)
        setOrder(orderInfo)
        console.log(orderInfo);
    }

  return (
    <div className='p-8 h-[calc(100%-40px)]'>
        <TitleTab text={'Thông tin đơn hàng'} className={'text-black'}></TitleTab>
    <div>
        <div className="mt-4 bg-white p-5 rounded-lg shadow-inner" style={{minHeight: "87%"}}>
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
            <hr className='my-8'/>
            <div>
                <span className='text-xl font-bold'>Thông tin đơn hàng</span>
            </div>
            <OrderItem data={order} refreshData={getData}></OrderItem>
        </div>
    </div>
  
      </div>
  )
}
