'use client'
import React, {useState, useEffect} from 'react'
import { getStatisticalReview, getStatisticalReviewChart } from '@/services/statisticalService'
import TitleTab from '@/components/TitleTab/TitleTab'
import Chart from '@/components/Chart/Chart'
const moment = require('moment');
import Pagination from '@/components/Pagination/Pagination'

export default function page() {
    const [statisticalReviewData, setStatisticalReviewData] = useState('')
    const [typeView, setTypeView] = useState('all')
    const [arrReview, setArrReview] = useState('')
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataChart, setDataChart] = useState([])
    const [inputValue, setInputValue] = useState('')

    useEffect(()=>{
        if(typeView){
            getData()
        }
    }, [typeView, inputValue])

    async function getData(){
        let date = new Date();
        let today = moment(date).format('YYYY-MM-DD');
        const formData = {
            "date": inputValue,
            "type": typeView
        }
        let statis = await getStatisticalReview(JSON.stringify(formData))
        let chart = await getStatisticalReviewChart(JSON.stringify(formData))
        setDataChart(chart)
        console.log(chart);
        console.log(statis);
        if (typeView === "day"){
            setStatisticalReviewData(statis.day)
            setArrReview(statis.day.reviews)
            setTotalPages(statis.day.pagination.totalPages);
            setCurrentPage(statis.day.pagination.currentPage);
        } else if (typeView === "week"){
            setStatisticalReviewData(statis.week)
            setArrReview(statis.week.reviews)
            setTotalPages(statis.week.pagination.totalPages);
            setCurrentPage(statis.week.pagination.currentPage);
        } else if (typeView === "month"){
            setStatisticalReviewData(statis.month)
            setArrReview(statis.month.reviews)
            setTotalPages(statis.month.pagination.totalPages);
            setCurrentPage(statis.month.pagination.currentPage);
        } else {
            setStatisticalReviewData(statis.all)
            setArrReview(statis.all.reviews)
            setTotalPages(statis.all.pagination.totalPages);
            setCurrentPage(statis.all.pagination.currentPage);
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
  return (
    <div className='p-8 h-[calc(100%-40px)]'>
        <div>
            <TitleTab text={'Đánh giá'} className={"text-black"}></TitleTab>
        </div>
        <div className='bg-white p-5 rounded-lg shadow-inner my-4'>
            <div className='flex flex-row gap-2 justify-end'>
                <input type="datetime-local"  className='rounded' value={inputValue !== '' ? moment(inputValue).format('YYYY-MM-DDTHH:mm') : ''} onChange={(e)=> handleChangeInput(e.target.value)}/>
                <select className='rounded' onChange={(e)=>{handleChangeSelect(e.target.value)}}>
                    <option value="all">Tất cả</option>
                    <option value="day">Theo ngày</option>
                    <option value="week">Theo tuần</option>
                    <option value="month">Theo tháng</option>
                </select>
            </div>
            <div className='flex flex-row gap-5 w-full'>
                <div className='flex flex-col w-1/2'>
                    <div className='py-5'>
                        <h1 className='font-bold text-2xl text-green-500'>Thống kê đánh giá</h1>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-row gap-4 p-5 rounded-md border-2'>
                            <div className='flex flex-col w-full'>
                                <div className='text-slate-700 font-bold text-xl flex justify-start'>
                                    <span>Số lượng đánh giá</span>
                                </div>
                                <div className='font-medium mt-1 flex justify-start'>
                                    <span>Chỉ số thể hiện tổng số đánh giá các sản phẩm của cửa hàng</span>
                                </div>
                                <div className='text-6xl m-4 font-medium flex justify-center'>
                                    {statisticalReviewData.total ? <span className='flex justify-center text-slate-500'>{statisticalReviewData.total}</span> : <span className='flex justify-center text-slate-500'>0</span>}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row gap-4 p-5 rounded-md border-2'>
                            <div className='flex flex-col w-full'>
                                <div className='text-slate-700 font-bold text-xl flex justify-start'>
                                    <span>Trung bình đánh giá</span>
                                </div>
                                <div className='font-medium mt-1 flex justify-start'>
                                    <span>Chỉ số thể hiện điểm trung bình trên tổng số đánh giá các sản phẩm của cửa hàng</span>
                                </div>
                                <div className='text-6xl m-4 font-medium w-full flex justify-center'>
                                {statisticalReviewData && statisticalReviewData.avgRate &&
                                    <p className='flex justify-center text-slate-500 '>
                                        {parseFloat(statisticalReviewData.avgRate.toFixed(1))}
                                    </p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row w-1/2 gap-10'>
                    <div className='flex flex-col w-full'>
                        <div className='py-5'>
                            <h1 className='font-bold text-2xl text-green-500'>Biểu đồ đánh giá</h1>
                        </div>
                        <div className='border-2'>
                            <Chart typeChart={'pie'} data={dataChart}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='bg-white p-5 rounded-lg shadow-inner my-4'>
            <div className='py-5'>
                <h1 className='font-bold text-2xl text-green-500'>Chi tiết đánh giá</h1>
            </div>
            <div className='shadow-md'>
                <table className="w-full border-collapse font-arial mt-4">
                <thead className='bg-slate-100'>
                    <tr>
                    <th className="border text-left p-4">Khách hàng</th>
                    <th className="border text-left p-4">Nội dung</th>
                    <th className="border text-center p-4">Đơn hàng</th>
                    <th className="border text-center p-4">Đánh giá</th>
                    <th className="border text-center p-4">Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    arrReview.length > 0 ? (          
                    arrReview && arrReview.map((item, index)=>{
                        return(
                        <tr key={index}>
                            <td className="border text-left p-4">
                            <div className='flex flex-row gap-2 items-center'>
                                <img src={item.user.avt} alt="" width={50} height={50}/>
                                <span>{item.user.name}</span>
                            </div>
                            </td>
                            <td className="border text-left p-4">{item.content}</td>
                            <td className="border text-center p-4">{item.orderID}</td>
                            <td className="border text-center p-4">
                                <div className='flex flex-row gap-1 items-center justify-center'>
                                    <span>{item.rate}</span>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/argishop-cab9c.appspot.com/o/images%2Fstar.png?alt=media&token=a3f60679-4b2d-4379-817c-56b056c609b5" alt="" width={20} height={20}/>
                                </div>
                            </td>
                            <td className="border text-center p-4">{moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>
                        </tr>
                        )
                    })
                    ) : (            
                    <tr >
                        <td colSpan="6" className='border text-center p-4'>Không có bình luận</td>
                    </tr>
                    )}
                </tbody> 
            </table>
            <div className='px-2 py-4'>
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageClick} />
            </div>
            </div>
        </div>
    </div>
  )
}
