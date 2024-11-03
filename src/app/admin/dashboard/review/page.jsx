'use client'
import React, {useState, useEffect} from 'react'
import TitleTab from '@/components/TitleTab/TitleTab'
import Table from '@/components/DataTable/Table'
import Icon from '@/assets/icon/icon'
import Link from 'next/link'
import ToolTips from '@/components/ToolTips/ToolTips'
import SearchDatatable from '@/components/SearchDatatable/SearchDatatable'
import Pagination from '@/components/Pagination/Pagination'
import {Select, SelectItem, Avatar} from "@nextui-org/react";

import { getAllReview, deleteReview, searchReview} from '@/services/reviewService'
import { alertSuccess, confirmDelete } from '@/components/Swal/alert'
const moment = require('moment');

export default function page() {
    const [arrReview, setArrReview] = useState('')
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(()=>{
        getReview()
    },[])

    async function getReview(){
        let reviews = await getAllReview(currentPage)
        setArrReview(reviews.reviews)
        console.log(reviews);
        setTotalPages(reviews.pagination.totalPages);
        setCurrentPage(reviews.pagination.currentPage);
    }
    async function handleDelete (id){
        let isConfirm = await confirmDelete()
        if (isConfirm){
            let delReview = await deleteReview(id)
            if (delReview){
                alertSuccess({ status: 'success', text: 'Xóa nhân viên thành công' })
                getReview()
            }
        } 
    }
    const handlePageClick = ({ selected }) => {
        const newPage = selected + 1;
        setCurrentPage(newPage);
      };
    async function handleSearchReview(e){
        if (e.key === 'Enter') {
            const searchText = e.target.value;
            let rs = await searchReview(JSON.stringify({"text": searchText}), currentPage)
            console.log(rs);
            setArrReview(rs.reviews)
        }
    }
    async function handleEmptyInput (e){
        if (e.target.value === ''){
            getReview()
        }
    }
    async function handleChangeSelect(value){
        console.log(value);
        let rs = await searchReview(JSON.stringify({"text": value}), currentPage)
        console.log(rs);
        setArrReview(rs.reviews)
      }

  return (
    <div className='p-8 h-[calc(100vh-40px)]'>
      <TitleTab text={'Quản lý đánh giá'} className={'text-black'}></TitleTab>

    <div className='bg-white p-5 rounded-lg shadow-inner mt-4' style={{minHeight: "87%"}}>
      <div >
        <div className='flex flex-row justify-between'>
          <select className='rounded' onChange={(e)=>{handleChangeSelect(e.target.value)}}>
              <option value="all">Tất cả</option>
              <option value="1">1 sao</option>
              <option value="2">2 sao</option>
              <option value="3">3 sao</option>
              <option value="4">4 sao</option>
              <option value="5">5 sao</option>
          </select>
            <SearchDatatable fnSearch={handleSearchReview} fnChange={handleEmptyInput}></SearchDatatable>
          </div>
          <div className='shadow-md'>
            <table className="w-full border-collapse font-arial mt-4">
                <thead>
                  <tr>
                    <th className="border text-left p-4">Khách hàng</th>
                    <th className="border text-left p-4">Đơn hàng</th>
                    <th className="border text-center p-4">Nội dung</th>
                    <th className="border text-center p-4">Điểm</th>
                    <th className="border text-center p-4">Ngày đánh giá</th>
                    <th className="border text-left p-4">Thao tác</th>
                  </tr>
                </thead>

                <tbody>
                  {
                  arrReview.length > 0 ? (          
                    arrReview && arrReview.filter((item) => item.state != 'Nháp').map((item, index)=>{
                      return(
                        <tr key={index}>
                          <td className="border text-left p-4">
                              <div className='flex items-center gap-2'>
                                  {/* <img src={item.user.avt} alt="" width={50} height={50}/> */}
                                  <Avatar src={item.user.avt} size="lg" isBordered />
                                  <span>{item.user.name}</span>
                              </div>
                          </td>
                          <td className="border text-left p-4">{item.orderID}</td>
                          <td className="border text-center p-4">{item.content}</td>
                          <td className="border text-center p-4">
                              <div className='flex flex-row gap-1 items-center justify-center'>
                                  <span>{item.rate}</span>
                                  <img src="https://firebasestorage.googleapis.com/v0/b/argishop-cab9c.appspot.com/o/images%2Fstar.png?alt=media&token=e93c35a3-ec8b-4bd8-8cfe-310769d22afb" alt="" width={20} height={20}/>
                              </div>
                          </td>
                          <td className="border text-center p-4">{moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>

                          <td className="border text-left p-4">
                            <div className='flex flex-row gap-3 justify-center'>
                              {/* <ToolTips 
                                onClick={()=>handleApprove(item._id)}
                                icon={<Icon name={'check'} className={'text-green-600 w-6 h-6'}></Icon>}
                                tooltipText={"Xác nhận đơn hàng"}
                              /> */}
                              <ToolTips 
                                onClick={()=>handleDelete(item._id)}
                                icon={<Icon name={'delete'} className={'text-red-600 w-6 h-6'}></Icon>}
                                tooltipText={"Xóa đánh giá"}
                              />
                            </div>
                          </td>
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
              <div className='px-2 py-4'>
              <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageClick} />
              </div>
          </div>
      </div>
      </div>
    </div>
  )
}
