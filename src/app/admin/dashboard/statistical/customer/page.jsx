'use client'
import React, {useState, useEffect} from 'react'
import { getStatisticalUser, getStatisticalUserChart } from '@/services/statisticalService'
import TitleTab from '@/components/TitleTab/TitleTab'
import Chart from '@/components/Chart/Chart'
import Table from '@/components/DataTable/Table'
const moment = require('moment');

export default function page() {
    const [statisticalReviewData, setStatisticalReviewData] = useState('')
    const [typeView, setTypeView] = useState('day')
    const [arrUser, setArrUser] = useState('')
    const [arrChart, setArrChart] = useState('')
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState('')

    useEffect(()=>{
        getData()
    }, [typeView, inputValue])
    useEffect(()=>{
        getChart()
    }, [])

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
    async function getChart(){
        let date = new Date();
        let today = moment(date).format('YYYY-MM-DD');
        const formData = {
            "date": today,
            "type": "week"
        }
        let chart = await getStatisticalUserChart(JSON.stringify(formData))
        console.log(chart.stats);
        setArrChart(chart.stats)
    }
    async function getData(){
        let date = new Date();
        let today = moment(date).format('YYYY-MM-DD');
        console.log(inputValue);
        if (inputValue){
            const formData = {
                "date": inputValue,
                "type": typeView
            }
            let statis = await getStatisticalUser(JSON.stringify(formData))
            console.log(statis);
            if (typeView === "day"){
                setStatisticalReviewData(statis.day)
                setArrUser(statis.day.users.filter(user => user.role === ""))
                setTotalPages(statis.day.pagination.totalPages);
                setCurrentPage(statis.day.pagination.currentPage);
            } else if (typeView === "week"){
                setStatisticalReviewData(statis.week)
                setArrUser(statis.week.users.filter(user => user.role === ""))
                setTotalPages(statis.week.pagination.totalPages);
                setCurrentPage(statis.week.pagination.currentPage);
            } else if (typeView === "month"){
                setStatisticalReviewData(statis.month)
                setArrUser(statis.month.users)
                setTotalPages(statis.month.pagination.totalPages);
                setCurrentPage(statis.month.pagination.currentPage);
            } else {
                setStatisticalReviewData(statis.all)
                setArrUser(statis.all.users)
                setTotalPages(statis.all.pagination.totalPages);
                setCurrentPage(statis.all.pagination.currentPage);
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

    function handleChangeInput (value){
        console.log(value);
        setInputValue(value)
    }

    let keyImg = "avatarURL"
      const columns = [
        { key: '_id', label: 'Mã khách hàng' },
        { key: 'name', label: 'Tên khách hàng' },
        { key: keyImg, label: 'Hình ảnh' },
        { key: 'gender', label: 'Giới tính', text: 'text-center'},
        { key: 'phone', label: 'Số điện thoại', text: 'text-center'},
        { key: 'location', label: 'Quê quán', text: 'text-center'},
      ];

  return (
    <div className='p-8 h-[calc(100%-40px)]'>
        <div>
            <TitleTab text={'Khách hàng'} className={"text-black"}></TitleTab>
        </div>
        <div className='bg-white p-5 rounded-lg shadow-inner my-4'>
            <div className='flex justify-end flex-row gap-2'>
                <input type="datetime-local"  className='rounded' value={inputValue !== '' ? moment(inputValue).format('YYYY-MM-DDTHH:mm') : ''} onChange={(e)=> handleChangeInput(e.target.value)}/>
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
                        <h1 className='font-bold text-2xl text-green-500'>Thống kê khách hàng</h1>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-row gap-4 p-5 rounded-md border-2'>
                            <div className='flex flex-col w-full'>
                                <div className='text-slate-700 font-bold text-xl flex justify-start'>
                                    <span>Số lượng khách hàng</span>
                                </div>
                                <div className='font-medium mt-1 flex justify-start'>
                                    <span>Chỉ số thể hiện tổng số khách hàng đã đăng ký của cửa hàng</span>
                                </div>
                                <div className='text-6xl m-4 font-medium'>
                                    <p className='flex justify-center text-slate-500'>{statisticalReviewData.total}</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row gap-4 p-5 rounded-md border-2'>
                            <div className='flex flex-col w-full'>
                                <div className='text-slate-700 font-bold text-xl flex justify-start'>
                                    <span>Khách hàng đăng ký mới</span>
                                </div>
                                <div className='font-medium mt-1 flex justify-start'>
                                    <span>Chỉ số thể hiện tổng số khách hàng đăng ký mới của cửa hàng</span>
                                </div>
                                <div className='text-6xl m-4 font-medium w-full'>
                                    <p className='flex justify-center text-slate-500 '>{arrUser.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row w-1/2 gap-10'>
                    <div className='flex flex-col w-full'>
                        <div className='py-5'>
                            <h1 className='font-bold text-2xl text-green-500'>Biểu đồ khách hàng</h1>
                        </div>
                        <div className='border-2'>
                            <Chart typeChart={'bar'} type={"week1"} data={arrChart} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='bg-white p-5 rounded-lg shadow-inner my-4'>
            <div className='py-5'>
                <h1 className='font-bold text-2xl text-green-500'>Chi tiết khách hàng</h1>
            </div>
            <div className='mt-4'>
                <div className='shadow-md'> 
                    <Table
                    keyImg={keyImg}
                    columns={columns}
                    data={arrUser}
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
