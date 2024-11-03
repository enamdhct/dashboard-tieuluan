'use client'
import React, {useState, useEffect} from 'react'
import {getStatisticalWarehouse } from '@/services/statisticalService'
import TitleTab from '@/components/TitleTab/TitleTab'
import Chart from '@/components/Chart/Chart'

const moment = require('moment');
import Pagination from '@/components/Pagination/Pagination'

export default function page() {
    const [typeView, setTypeView] = useState('day')
    const [arrWarehouse, setArrWarehouse] = useState('')
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState(new Date())

    useEffect(()=>{
        if (inputValue === ''){
            setDate()
        }
    }, [])
    useEffect(()=>{
        getData()
    }, [currentPage, typeView, inputValue])
    function setDate(){
        let date = new Date();
        let today = moment(date).format('YYYY-MM-DD');
        setInputValue(today)
    }
    async function getData(){
        let date = new Date();
        let today = moment(date).format('YYYY-MM-DD');
        const formData = {
            "date": inputValue,
            "type": typeView
        }
        console.log(formData);
        let statis = await getStatisticalWarehouse(JSON.stringify(formData), currentPage)
        console.log(statis);
        setArrWarehouse(statis?.warehouses)
        setTotalPages(statis?.pagination.totalPages);
        setCurrentPage(statis?.pagination.currentPage);

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
        <div className='bg-white p-5 rounded-lg shadow-inner h-full' >
            <div>
                <TitleTab text={'Kho hàng'} className={"text-black"}></TitleTab>
            </div>
            <div className='flex flex-row justify-between items-center mt-4'>
                <div>
                    <h1 className='font-bold text-2xl text-green-500'>Chi tiết kho hàng</h1>
                </div>
                <div className='flex justify-end flex-row gap-2'>
                    <input type="datetime-local"  className='rounded' value={inputValue} onChange={(e)=> handleChangeInput(e.target.value)}/>
                    <select className='rounded' onChange={(e)=>{handleChangeSelect(e.target.value)}}>
                        <option value="day">Theo ngày</option>
                        <option value="week">Theo tuần</option>
                        <option value="month">Theo tháng</option>
                        <option value="all">Tất cả</option>
                    </select>
                </div>
            </div>
            <div className='border mt-4 rounded shadow-lg'>
                <div>
                    <table className="w-full border-collapse font-arial">
                    <thead className='bg-slate-100'>
                        <tr>
                        <th className="border text-center p-4">Sản phẩm</th>
                        <th className="border text-center p-4">Số lượng nhập kho</th>
                        <th className="border text-center p-4">Số lượng bán ra</th>
                        <th className="border text-center p-4">Số lượng còn lại</th>
                        <th className="border text-center p-4">Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        (arrWarehouse && arrWarehouse.length > 0) ? (          
                        arrWarehouse && arrWarehouse.map((item, index)=>{
                            return(
                            <tr key={index}>
                                <td className="border text-left p-4">
                                <div className='flex flex-row gap-2 items-center'>
                                    <img src={item.productIMG} alt="" width={50} height={50}/>
                                    <span>{item.productName}</span>
                                </div>
                                </td>
                                <td className="border text-center p-4">{item.totalImport}</td>
                                <td className="border text-center p-4">{item.totalExport}</td>
                                <td className="border text-center p-4">{item.quantity}</td>
                                <td className="border text-center p-4">Xem chi tiết</td>
                            </tr>
                            )
                        })
                        ) : (            
                        <tr >
                            <td colSpan="6" className='border text-center p-4'>Không có thông tin</td>
                        </tr>
                        )}
                    </tbody> 
                </table>
                <div className='p-3'>
                    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageClick} />
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
