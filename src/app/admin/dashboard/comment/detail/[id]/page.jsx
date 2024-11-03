'use client'
import React, {useState, useEffect} from 'react'
import { getCommentDetail, deleteRepComment } from '@/services/commentService'
import TitleTab from '@/components/TitleTab/TitleTab'
import Pagination from '@/components/Pagination/Pagination'
import ToolTips from '@/components/ToolTips/ToolTips'
import { Avatar } from '@nextui-org/react'
import Icon from '@/assets/icon/icon'
import { confirmDelete, alertSuccess } from '@/components/Swal/alert'

const moment = require('moment');

export default function page({params}) {
  const [comment, setComment] = useState('')
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
    if (params){
      getReComment()
    }
  }, [params])

  async function getReComment(){
    let reComment = await getCommentDetail(currentPage, JSON.stringify({commentID: params.id}))
    console.log(reComment);
    setComment(reComment.comments)
    setTotalPages(reComment.pagination.totalPages);
    setCurrentPage(reComment.pagination.currentPage);
  }
  const handlePageClick = ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
  };
  async function handleDelete (id){
    let isConfirm = await confirmDelete()
    if (isConfirm){
      const formData = {
        "commentId": params.id,
        "replyId": id
      }
      let rs = await deleteRepComment(JSON.stringify(formData))
      if (rs){
        alertSuccess({ status: 'success', text: 'Xóa bình luận thành công' })
        getReComment()
      }
    }
  }
  return (
    <div className='p-8 h-[calc(100%-40px)]'>
      <TitleTab text={'Chi tiết bình luận'} className={'text-black'}></TitleTab>
      <div className='bg-white p-5 rounded-lg shadow-inner my-4' style={{minHeight: "87%"}}>
      <div className='shadow-md'>
        <table className="w-full border-collapse font-arial mt-4">
            <thead>
              <tr>
                <th className="border text-left p-4">Khách hàng</th>
                <th className="border text-left p-4">Nội dung</th>
                <th className="border text-center p-4">Thời gian</th>
                <th className="border text-center p-4">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {
              comment.length > 0 ? (          
                comment && comment.map((item, index)=>{
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
                      <td className="border text-center p-4">{moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}</td>
                      <td className="border text-left p-4">
                        <div className='flex flex-row gap-3 justify-center'>
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
