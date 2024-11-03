'use client'
import React, {useState, useEffect} from 'react'
import { getStatisticalOrder, getStatisticalOrderChart } from '@/services/statisticalService'
import TitleTab from '@/components/TitleTab/TitleTab'
import Chart from '@/components/Chart/Chart'
import Table from '@/components/DataTable/Table'
const moment = require('moment');

export default function page() {
    const [statisticalOrderData, setStatisticalOrderData] = useState('')
    const [typeView, setTypeView] = useState('day')
    const [arrOrder, setArrOrder] = useState('')
    const [arrChart, setArrChart] = useState('')
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataOrder, setDataOrder] = useState('')

    useEffect(()=>{
        getData()
    }, [typeView])

    useEffect(()=>{
      getChart()
  }, [])

    useEffect(()=>{
      updateData(typeView, statisticalOrderData)
  }, [typeView, statisticalOrderData])

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
    async function getData(){
        let date = new Date();
        let today = moment(date).format('YYYY-MM-DD');
        const formData = {
            "date": today,
            "type": typeView
        }
        let statis = await getStatisticalOrder(JSON.stringify(formData))
        console.log(statis);
        setStatisticalOrderData(statis)
    }
    function updateData(typeView, statisticalOrderData){
      if(statisticalOrderData){
          if (typeView === 'all'){
              setDataOrder(statisticalOrderData.orders.all)
              setArrOrder(statisticalOrderData.orderDetail.all)
          } else if (typeView === 'day'){
              setDataOrder(statisticalOrderData.orders.byDay)
              setArrOrder(statisticalOrderData.orderDetail.byDay)
          } else if (typeView === 'week'){
              setDataOrder(statisticalOrderData.orders.byWeek)
              setArrOrder(statisticalOrderData.orderDetail.byWeek)
          } else if (typeView === 'month'){
              setDataOrder(statisticalOrderData.orders.byMonth)
              setArrOrder(statisticalOrderData.orderDetail.byMonth)
          }
      }
  }
    function handleChangeSelect(type){
        setTypeView(type)
    } 
    const handlePageClick = ({ selected }) => {
        const newPage = selected + 1;
        setCurrentPage(newPage);
      };

      const columns = [
        { key: '_id', label: 'Mã đơn hàng' },
        { key: 'userID', label: 'Khách hàng', text: 'text-center'},
        { key: 'Price', label: 'Giá tiền', text: 'text-center'},
        { key: 'note', label: 'Lời nhắn', text: 'text-center'},
      ];
      const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        }).format(amount);
    };
    const customActionColumn = {
      label: 'Thời gian',
      render: (item) => (
          <div className='text-center'>{moment(item.orderTime).format("DD/MM/YYYY HH:mm:ss")}</div>
      ),
    };
  return (
    <div className='p-8 h-[calc(100%-40px)]'>
        <div>
            <TitleTab text={'Đơn hàng'} className={"text-black"}></TitleTab>
        </div>
        <div className='bg-white p-5 rounded-lg shadow-inner my-4'>
            <div className='flex justify-end'>
                <select className='rounded' onChange={(e)=>{handleChangeSelect(e.target.value)}}>
                    <option value="day">Theo ngày</option>
                    <option value="week">Theo tuần</option>
                    <option value="month">Theo tháng</option>
                    <option value="all">Tất cả</option>
                </select>
            </div>
            <div className='flex flex-row gap-5 w-full'>
                <div className='flex flex-col w-1/2'>
                    <div className='py-5'>
                        <h1 className='font-bold text-2xl text-green-500'>Thống kê đơn hàng</h1>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-row gap-4 p-5 rounded-md border-2'>
                            <div className='flex flex-col w-full'>
                                <div className='text-slate-700 font-bold text-xl flex justify-start'>
                                    <span>Số lượng đơn hàng</span>
                                </div>
                                <div className='font-medium mt-1 flex justify-start'>
                                    <span>Chỉ số thể hiện tổng số đơn hàng của cửa hàng</span>
                                </div>
                                <div className='text-6xl m-4 font-medium'>
                                    <p className='flex justify-center text-slate-500'>{dataOrder.totalOrders}</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row gap-4 p-5 rounded-md border-2'>
                            <div className='flex flex-col w-full'>
                                <div className='text-slate-700 font-bold text-xl flex justify-start'>
                                    <span>Doanh thu</span>
                                </div>
                                <div className='font-medium mt-1 flex justify-start'>
                                    <span>Chỉ số thể hiện doanh thu của cửa hàng</span>
                                </div>
                                <div className='text-6xl m-4 font-medium w-full'>
                                    <p className='flex justify-center text-slate-500 '>{formatCurrency(dataOrder.totalRevenue)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row w-1/2 gap-10'>
                    <div className='flex flex-col w-full'>
                        <div className='py-5'>
                            <h1 className='font-bold text-2xl text-green-500'>Biểu đồ đơn hàng</h1>
                        </div>
                        <div className='border-2'>
                            <Chart typeChart={'bar'} data={arrChart} type={'week1'}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='bg-white p-5 rounded-lg shadow-inner my-4'>
            <div className='py-5'>
                <h1 className='font-bold text-2xl text-green-500'>Chi tiết đơn hàng</h1>
            </div>
            <div className='mt-4'>
                <div>
                    <Table
                    customColumnName={"Thời gian"}
                    customActionColumn={customActionColumn}
                    columns={columns}
                    data={arrOrder}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageClick}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}
