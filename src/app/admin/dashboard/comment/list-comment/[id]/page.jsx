'use client'
import React ,{useEffect, useState}from 'react'
import TitleTab from '@/components/TitleTab/TitleTab'
import Icon from '@/assets/icon/icon'
import { confirmDelete, alertSuccess } from '@/components/Swal/alert'
import ToolTips from '@/components/ToolTips/ToolTips'
import { getAll, deleteComment, getAllWithProduct } from '@/services/commentService'
import Pagination from '@/components/Pagination/Pagination'
import { Avatar } from '@nextui-org/react'
import Link from 'next/link'

const moment = require('moment');

export default function page({params}) {
  const [arrComment, setArrComment] = useState('')

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
      getData()
  },[])
  async function getData(){
    let data = await getAllWithProduct(JSON.stringify({productId: params.id}))
    setArrComment(data.comments)
    setTotalPages(data.pagination.totalPages);
    setCurrentPage(data.pagination.currentPage);
  }

  const handlePageClick = ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
  };

  async function handleDelete (id){
    let isConfirm = await confirmDelete()
    if (isConfirm){
      let rs = await deleteComment(id)
      if (rs){
        getData()
      }
    }
  }

  async function handleRepComment (id){
  }

  async function handleChangeSelect(value){
    if (value === 'all'){
      getData()
    } else {
      let arrComment = await getCommentWithState(JSON.stringify({"state": value}))
      if (arrComment){
        setArrComment(arrComment)
      }
    }
  }
  return (
    <div className='p-8 h-[calc(100%-40px)]'>
      <TitleTab text={'Chi tiết bình luận'} className={'text-black'}></TitleTab>
      <div className='bg-white p-5 rounded-lg shadow-inner my-4' style={{minHeight: "87%"}}>
      <div className='shadow-md'>
        <table className="w-full border-collapse font-arial mt-4">
            <thead className='bg-slate-100'>
              <tr>
                <th className="border text-left p-4">Khách hàng</th>
                <th className="border text-left p-4">Nội dung</th>
                <th className="border text-left p-4">Sản phẩm</th>
                <th className="border text-center p-4">Thời gian</th>
                <th className="border text-center p-4">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {
              arrComment.length > 0 ? (          
                arrComment && arrComment.map((item, index)=>{
                  return(
                    <tr key={index}>
                      <td className="border text-left p-4">
                        <div className='flex flex-row gap-2 items-center'>
                          {/* <img src={item.user.avatarURL} alt="" width={50} height={50}/> */}
                          <Avatar src={item.user.avatarURL} size="lg" isBordered />
                          <span>{item.user.name}</span>
                        </div>
                      </td>
                      <td className="border text-left p-4">{item.content}</td>
                      <td className="border text-center p-4">
                        <div className='flex flex-row gap-2 items-center'>
                            <img src={item.product.imgURL} alt="" width={50} height={50}/>
                            <span>{item.product.name}</span>
                          </div>
                      </td>
                      <td className="border text-center p-4">{moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>
                      <td className="border text-left p-4">
                        <div className='flex flex-row gap-3 justify-center'>
                          <Link href={`./detail/${item._id}`}>
                            <ToolTips
                              icon={<Icon name={'detail'} className={'text-sky-500 w-6 h-6'}></Icon>}
                              tooltipText={'Xem chi tiết'}
                            />
                          </Link>
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
                  <td colSpan="6" className='border text-center p-4'>Không có bình luận</td>
                </tr>
              )}
            </tbody> 
        </table>
        <div className='px-2 py-5'>
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageClick} />
        </div>
      </div>
      </div>
    </div>
  )
}

