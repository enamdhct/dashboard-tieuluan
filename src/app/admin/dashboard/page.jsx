'use client'
import React, {useState, useEffect} from 'react'
import TitleTab from '@/components/TitleTab/TitleTab'
import Chart from '@/components/Chart/Chart'
import { getStatistical } from '@/services/statisticalService'
import { getStatisticalReviewChart, getStatisticalOrderChart } from '@/services/statisticalService'
const moment = require('moment');

export default function page() {
    const [statistical, setStatistical] = useState('')
    const [typeStatisticals, setTypeStatisticals] = useState('all')
    const [dataOrder, setDataOrder] = useState('')
    const [dataReview, setDataReview] = useState('')
    const [dateCustomer, setDataCustomer] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [dataChart, setDataChart] = useState([])
    const [arrChart, setArrChart] = useState('')

    useEffect(()=>{
        getData()
        getChart()
    }, [])

    useEffect(()=>{
        if(typeStatisticals){
            updateData(typeStatisticals, statistical)

        }
        getData()
    }, [typeStatisticals, statistical, inputValue])

    useEffect(()=>{
        getDataChart()
    }, [typeStatisticals, inputValue])

    useEffect(()=>{
        if (inputValue === ''){
            setDate()
        }
    }, [inputValue])

    function setDate(){
        let date = new Date();
        let today = moment(date).format('YYYY-MM-DDThh:mm:ss');
        setInputValue(today)
    }

    async function getData(){
        let date = new Date(inputValue);
        let today = moment(date).format('YYYY-MM-DD');
        let statis = await getStatistical(JSON.stringify({"date": today}))
        setStatistical(statis)
    }
    async function getDataChart(){
        const formData = {
            "date": inputValue,
            "type": typeStatisticals
        }
        let chart = await getStatisticalReviewChart(JSON.stringify(formData))
        console.log(chart);
        setDataChart(chart)
    }
    function updateData(typeStatisticals, statistical){
        if(statistical){
            if (typeStatisticals === 'all'){
                setDataOrder(statistical?.orders?.all)
                setDataReview(statistical?.reviews?.all)
                setDataCustomer(statistical?.customers?.all)
            } else if (typeStatisticals === 'day'){
                setDataOrder(statistical?.orders?.byDay)
                setDataReview(statistical?.reviews?.byDay)
                setDataCustomer(statistical?.customers?.byDay)
            } else if (typeStatisticals === 'week'){
                setDataOrder(statistical?.orders?.byWeek)
                setDataReview(statistical?.reviews?.byWeek)
                setDataCustomer(statistical?.customers?.byWeek)
            } else if (typeStatisticals === 'month'){
                setDataOrder(statistical?.orders?.byMonth)
                setDataReview(statistical?.reviews?.byMonth)
                setDataCustomer(statistical?.customers?.byMonth)
            }
        }
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        }).format(amount);
    };
    function handleChangeSelect(type){
        setTypeStatisticals(type)
    }
    function handleChangeInput (value){
        console.log(value);
        setInputValue(value)
    }
    async function getChart(){
      let date = new Date();
      let today = moment(date).format('YYYY-MM-DD');
      const formData = {
          "date": today,
          "type": "week"
      }
      let chart = await getStatisticalOrderChart(JSON.stringify(formData))
      console.log(chart);
      setArrChart(chart.stats)
  }
  return (
    <div className='p-8 h-[calc(100%-40px)]'>
        <div>
            <TitleTab text={'Dashboard'} className={"text-black"}></TitleTab>
        </div>
        <div className='bg-white p-5 rounded-lg shadow-inner mt-4'>
            <div className='flex flex-row gap-2 justify-end'>
                <input type="datetime-local"  className='rounded' value={inputValue !== '' ? moment(inputValue).format('YYYY-MM-DDTHH:mm') : ''} onChange={(e)=> handleChangeInput(e.target.value)}/>
                <select className='rounded' onChange={(e)=>{handleChangeSelect(e.target.value)}}>
                    <option value="all">Tất cả</option>
                    <option value="day">Theo ngày</option>
                    <option value="week">Theo tuần</option>
                    <option value="month">Theo tháng</option>
                </select>
            </div>
            <div className='flex flex-row w-full gap-5'>
                <div className='mt-5 flex flex-row gap-4 justify-around items-center px-5 py-10 rounded-md w-1/4 border-2 border-green-400'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/argishop-cab9c.appspot.com/o/images%2Forder.png?alt=media&token=2b6e5115-f070-4576-a5ec-790ade4d325c" alt=""  width={50} height={50}/>
                    <div className='flex flex-col'>
                        <div className='text-slate-400 flex justify-center'>
                            <span>Số lượng đơn hàng</span>
                        </div>
                        <div className='text-2xl font-medium mt-3 flex justify-center'>
                            <span>{dataOrder?.totalOrders}</span>
                        </div>
                    </div>
                </div>
                <div className='mt-5 flex flex-row gap-4 justify-around items-center px-5 py-10 rounded-md w-1/4 border-2 border-red-400'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/argishop-cab9c.appspot.com/o/images%2Fnew-employee.png?alt=media&token=4a80633a-5231-4ce9-8584-f0ecc79f87ac" alt=""  width={50} height={50}/>
                    <div className='flex flex-col'>
                        <div className='text-slate-400 flex justify-center'>
                            <span>Khách hàng mới</span>
                        </div>
                        <div className='text-2xl font-medium mt-3 flex justify-center'>
                            <span>{dateCustomer?.totalCustomers}</span>
                        </div>
                    </div>
                </div>
                <div className='mt-5 flex flex-row gap-4 justify-around items-center px-5 py-10 rounded-md w-1/4 border-2 border-blue-400'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/argishop-cab9c.appspot.com/o/images%2Frating.png?alt=media&token=8a256246-3f43-4504-bc27-98c6b5e00aa5" alt=""  width={50} height={50}/>
                    <div className='flex flex-col'>
                        <div className='text-slate-400 flex justify-center'>
                            <span>Số lượng đánh giá</span>
                        </div>
                        <div className='text-2xl font-medium mt-3 flex justify-center'>
                            <span>{dataReview?.totalReviews}</span>
                        </div>
                    </div>
                </div>
                <div className='mt-5 flex flex-row gap-4 justify-around items-center px-5 py-10 rounded-md w-1/4 border-2 border-yellow-400'>

                    <img src="https://firebasestorage.googleapis.com/v0/b/argishop-cab9c.appspot.com/o/images%2Fmoney-bag.png?alt=media&token=832b5db1-150f-44a9-a4cc-f73663eefd8f" alt=""  width={50} height={50}/>
                    <div className='flex flex-col'>
                        <div className='text-slate-400 flex justify-center'>
                            <span>Doanh số</span>
                        </div>
                        <div className='text-2xl font-medium mt-3 flex justify-center'>
                            <span>{formatCurrency(dataOrder?.totalRevenue)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-row w-full gap-4'>
            <div className='w-1/2 flex flex-col bg-white p-5 rounded-lg shadow-inner mt-4'>
                <div className='py-5'>
                    <h1 className='font-bold text-2xl text-green-500'>Biểu đồ doanh số</h1>
                </div>
                <Chart typeChart={'bar'} data={arrChart} type={'week1'} />
            </div>
            <div className='w-1/2 flex flex-col bg-white p-5 rounded-lg shadow-inner mt-4'>
                <div className='py-5'>
                    <h1 className='font-bold text-2xl text-green-500'>Biểu đồ đánh giá</h1>
                </div>
                <Chart typeChart={'pie'} data={dataChart}/>
            </div>
        </div>
    </div>
  )
}
